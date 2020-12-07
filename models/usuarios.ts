import { Schema } from 'mongoose';
import crypto from 'crypto';

var fonoSchema = new Schema ({
    fon_num : {
        type : String,
        required : true
    },
    fon_ope : {
        type : String,
        required : true
    }
})

var visitaSchema = new Schema ({
    vst_fec : {
        type : String,
        min : '2010-01-01',
    },
    vst_sed : {
        type : String
    }
})

export var usuarioSchema = new Schema ({
    usu_nom : {
        type : String,
        required : true
    },
    usu_ape : {
        type : String,
        required : true
    },
    usu_dni : String,
    usu_eml : {
        type : String,
        required : true
    },
    usu_salt : String,
    usu_hash : String,
    usu_tel : [
        fonoSchema
    ],
    usu_vst : [
        visitaSchema
    ]
}, {
    timestamps : true
})

usuarioSchema.methods.cifrarContraseña = function (password:string){
    this.usu_salt = crypto.randomBytes(16).toString('hex');
    this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
}

usuarioSchema.methods.verificarContraseña = function(password:string){
    let temporal = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    if (temporal == this.usu_hash) {
        return true;
    } else {
        return false;        
    }
}