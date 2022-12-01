import { validationResult } from 'express-validator';
import { MediaCreateDTO, MediaUpdateDTO } from '../interface/media/MediaDTO';
import { Request, Response } from "express";
import { mediaService } from "../service";
import { sc, rm, sortOption} from '../constants';
import { fail,success } from '../constants/response';
import { Prisma } from '@prisma/client';
import { dir } from 'console';
//CRUD


//C : 넷플릭에 미디어 컨텐츠 추가
const createMedia = async (req : Request, res : Response) => {
    

    const error = validationResult(req);
    //예외 1 : 필요한 정보(title, length, quality ~ summary)가 안들어왔을때

    if(!error.isEmpty()){
        console.log(error);
        
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));
    }

    const imageFile : Express.MulterS3.File = req.file as Express.MulterS3.File;
    let thumbnail : string;

    if(!imageFile.location){
        thumbnail="이미지가 준비되지 않았음"
    }
    else{
        thumbnail = imageFile.location;

    }
    //console.log(thumbnail);
    

    const { title, length, 
        quality, seriesNum, actors, createYear,
        age, genre, character, summary} = req.body;

    

    const mediaCreateDto : MediaCreateDTO = {
        title : title,
        mediaInfo : {
            thumbnail : thumbnail,
            length : +length,
            quality : quality,
            seriesNum : +seriesNum,
            age : +age
        },
        contentInfo : {
            createYear : +createYear,
            actors : actors,
            genre : genre,
            character : character,
            summary : summary
        }
    }
    
    const createdMedia = await mediaService.createMedia( mediaCreateDto);
    //예외 2 : 같은 이름의 컨텐츠가 있음

    if (!createdMedia || createdMedia instanceof Prisma.PrismaClientKnownRequestError){
        return res.status(sc.CONFLICT).send(fail(sc.CONFLICT,rm.ALREADY_MEDIA));
    }
    //성공 : 잘 만들어짐
    return res.status(sc.CREATED).send(success(sc.CREATED,rm.CREATE_MEDIA_SUCCESS,createdMedia));
    
}

//R
// 전체 미디어 목록 조회
const getAllMedia = async (req : Request, res : Response) => {
    const {page, limit} = req.query;
    //페이지네이션을 설정안하면 그냥 전체 가져오고, 설정하면 설정한대로 가져오기
    if(page && limit){
        if(isNaN(+page) || isNaN(+limit)){//만약 쿼리를 받았는데 둘중 하나라도 숫자가 아니면 올바르지못한 값
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.INVALID_PAGINATION));
        }
    }

    //둘중 하나만 존재할 경우
    if((page&&!limit)||(!page&&limit)){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.INVALID_PAGINATION));
    }

    // page와 limit은 둘다 없거나, 둘다 존재시는 둘다 숫자
    const mediaList = await mediaService.getAllMedia( +(page as any), +(limit as any));

    return res.status(sc.OK).send(success(sc.OK,rm.READ_MEDIA_SUCCESS,mediaList));

}

// 미디어 목록 하나조회 - detail
const getMediaDetail = async (req : Request, res : Response) => {
    const { mediaId } = req.params;
    
    // 예외 1. 미디어 아이디 오류
    if (!mediaId || isNaN(+mediaId)){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));

    }

    const mediaDetail = await mediaService.getMediaDetail(+mediaId);

    //예외 2. 해당 미디어 아이디가 없는경우
    if (!mediaDetail || mediaDetail instanceof Prisma.PrismaClientKnownRequestError){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.NULL_VALUE));
    }
    return res.status(sc.OK).send(success(sc.OK,rm.READ_MEDIA_SUCCESS,mediaDetail));

}

// U : 미디어 컨텐츠 정보 변경

const updateMedia = async (req : Request, res : Response) => {
    const { mediaId } = req.params;
    const mediaUpdateDto : MediaUpdateDTO = req.body;
    
    // 예외 1. 미디어 아이디 오류
    if (!mediaId || isNaN(+mediaId)){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));

    }

    
    const updatedMedia= await mediaService.updateMedia(mediaUpdateDto , +mediaId);

    //예외2 : 해당 미디어 아이디의 데이터가 없는경우
    if (!updatedMedia || updatedMedia instanceof Prisma.PrismaClientKnownRequestError){
        return res.status(sc.NO_CONTENT).send(fail(sc.NO_CONTENT,rm.MEDIA_NOT_FOUND));

    }
    return res.status(sc.OK).send(success(sc.OK,rm.UPDATE_MEDIA_SUCCESS,updatedMedia));

}

// D : 미디어 정보 삭제
const deleteMedia = async (req : Request, res : Response) => {
    const { mediaId } = req.params;

    //미디어 아이디 오류
    if (!mediaId || isNaN(+mediaId) ){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.BAD_REQUEST));

    } 
    
    const deletedMedia = await mediaService.deleteMedia(+mediaId);
    
    //미디어 삭제할 데이터가 없을때
    if(!deletedMedia || deletedMedia instanceof Prisma.PrismaClientKnownRequestError ){
        return res.status(sc.NO_CONTENT).send(fail(sc.NO_CONTENT,rm.MEDIA_NOT_FOUND));

    }
    else{
        return res.status(sc.OK).send(success(sc.OK,rm.DELETE_MEDIA_SUCCESS));
    }


}

const searchMediaByTitle = async(req : Request, res : Response)=>{
    const {keyword, option, sortby } = req.query;
    
    if(!keyword){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST)); 
    }

    //정렬 기준의 디폴트는 최신 등록순 
    let mediaSortBy : string; 
    let mediaSortOption : string;

    if(!sortby) mediaSortBy='createdAt'
    else if(sortby=='createdAt' || sortby == 'updatedAt' || sortby =='createYear') mediaSortBy=sortby; //올바른 정렬기준일때
    else{
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.INVALID_SORT_BY));
    }

    if(!option) mediaSortOption=sortOption.LATELY;
    else if(option == sortOption.LATELY || option == sortOption.OLDLY) mediaSortOption=option;
    else{
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.INVALID_SORT_OPTION));
    }

    try {
        const searchedMedia = await mediaService.searchMediaByTitle(keyword as string, mediaSortBy, mediaSortOption);
        
        if(!searchedMedia){
            return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT,rm.SEARCH_NO_MEDIA));
        }
        
        return res.status(sc.OK).send(success(sc.OK,rm.SEARCH_MEDIA_SUCCESS,searchedMedia));

        
    } catch (error) {
        console.log(error);
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.SEARCH_MEDIA_FAIL));

    }
    
}

const mediaController={
    createMedia,
    getAllMedia,
    getMediaDetail,
    updateMedia,
    deleteMedia,
    searchMediaByTitle

};

export default mediaController;

