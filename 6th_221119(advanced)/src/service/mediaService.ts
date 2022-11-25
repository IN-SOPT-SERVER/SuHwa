import { MediaCreateDTO, MediaUpdateDTO } from "../interface/media/MediaDTO";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



//CRUD

//C : 넷플릭에 미디어 컨텐츠 추가
const createMedia = async ( mediaCreateDto : MediaCreateDTO ) => {
    const data = await prisma.media.create({
        data : {
            title : mediaCreateDto.title,
            thumbnail : mediaCreateDto.mediaInfo.thumbnail,
            length : mediaCreateDto.mediaInfo.length,
            quality : mediaCreateDto.mediaInfo.quality,
            seriesNum : mediaCreateDto.mediaInfo.seriesNum,
            age : mediaCreateDto.mediaInfo.age,
            createYear : mediaCreateDto.contentInfo.createYear,
            actors : mediaCreateDto.contentInfo.actors,
            genre : mediaCreateDto.contentInfo.genre,
            character : mediaCreateDto.contentInfo.character,
            summary : mediaCreateDto.contentInfo.summary
            
        },
    }
    )
    .catch((error)=>{
        console.log(error);
        
        //이름이 이미 있는경우
        return error
    });


    return data;
}

//R
// 전체 미디어 목록 조회
const getAllMedia = async () => {
    const data = await prisma.media.findMany();
    return data;
//유저의 시청기록도 조회
}

// 미디어 목록 하나조회 - detail
const getMediaDetail = async (mediaId : number) => {
    const data = await prisma.media.findUnique({
        where:{
            id : mediaId
        }
    })
    .catch(error =>{
        return error
    });

    return data;
    
//유저의 시청기록도 조회
}

// U : 미디어 컨텐츠 정보 변경
const updateMedia= async(mediaUpdateDto : MediaUpdateDTO, mediaId : number)=>{
    const data = await prisma.media.update({
        where : {
            id : mediaId
        },
        data : {
            ...mediaUpdateDto
        }
    })
    .catch(error => { return error});

    return data;
};

// D : 미디어 정보 삭제
const deleteMedia= async( mediaId:number )=>{
    const data = await prisma.media.delete({
        where :{
            id : mediaId
        }

    }).catch(error => {
        return error;
    })

    return data;
    
}



const mediaService={
    createMedia,
    getAllMedia,
    getMediaDetail,
    updateMedia,
    deleteMedia
};

export default mediaService;

