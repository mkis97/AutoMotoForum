import db from './fb.js'

export default function getAllFromFirebase(collection){
    return new Promise(resolve => {
        db.collection(collection).onSnapshot(res => {
            resolve(res)
        })
    })
    
}

