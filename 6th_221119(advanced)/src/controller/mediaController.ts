import { MediaCreateDTO, MediaUpdateDTO } from '../interface/media/MediaDTO';
import { Request, Response } from "express";
import { mediaService } from "../service";
import { sc, rm} from '../constants';
import { fail,success } from '../constants/response';
import { Prisma } from '@prisma/client';
//CRUD


//C : 넷플릭에 미디어 컨텐츠 추가
const createMedia = async (req : Request, res : Response) => {
    const { title, thumbnail, length, 
        quality, seriesNum, actors, createYear,
        age, genre, character, summary} = req.body;

    //예외 1 : 필요한 정보(title, length, quality ~ summary)가 안들어왔을때
    if ( !title || !length || !quality 
        || !seriesNum || ! actors || !createYear 
        || !age || !genre || !character || !summary){
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.NULL_VALUE));

    }

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
            createYear : createYear,
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
    const mediaList = await mediaService.getAllMedia();

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

const mediaController={
    createMedia,
    getAllMedia,
    getMediaDetail,
    updateMedia,
    deleteMedia

};

export default mediaController;


