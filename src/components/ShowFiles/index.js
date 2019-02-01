import React, { Component } from 'react';
import { Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,CardFooter } from 'reactstrap';
import './style.sass';
class ShowFile extends Component{
    constructor(props){
        super(props)
    }

    typeIconUrl = (type) => {
        let iconUrl = ''
        if(type == 'application/vnd.google-apps.folder'){
            iconUrl = 'http://icons.iconarchive.com/icons/mcdo-design/smooth-leopard/512/Generic-Folder-Graphite-icon.png';
        }else if(type == 'text/plain'){
            iconUrl = 'https://marketplace.canva.com/MAB7k0EAGAw/1/thumbnail_large/canva-txt-file-icon-MAB7k0EAGAw.png';            
        }else if(type == 'application/vnd.google-apps.audio'){
            iconUrl = 'https://cdn4.iconfinder.com/data/icons/Pretty_office_icon_part_2/256/audio-file.png';            
        }else if(type == 'application/vnd.google-apps.document'){
            iconUrl = 'https://cdn2.iconfinder.com/data/icons/social-media-8/512/note3.png';            
        }else if(type == 'application/vnd.google-apps.drawing'){
            iconUrl = 'http://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Google-Drive-Drawings-icon.png';            
        }else if(type == 'application/vnd.google-apps.file'){
            iconUrl = 'http://files.softicons.com/download/social-media-icons/free-social-media-icons-by-uiconstock/png/512x512/Google-Drive-Icon.png';            
        }else if(type == 'application/vnd.google-apps.form'){
            iconUrl = 'https://img.icons8.com/color/1600/google-forms-new-logo-1.png';            
        }else if(type == 'application/vnd.google-apps.fusiontable'){
            iconUrl = 'http://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Google-Drive-Fusion-Tables-icon.png';            
        }else if(type == 'application/vnd.google-apps.map'){
            iconUrl = 'https://img.icons8.com/color/1600/google-maps.png';            
        }else if(type == 'application/vnd.google-apps.photo' || type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg'){
            iconUrl = 'https://www.freeiconspng.com/uploads/pictures-icon-22.gif';            
        }else if(type == 'application/vnd.google-apps.presentation'){
            iconUrl = 'https://b.kisscc0.com/20180717/vtq/kisscc0-g-suite-google-docs-google-slides-google-drive-pre-slides-icon-android-lollipop-5b4d8aa4797b16.0439559715318084204976.jpghttps://blogs.shu.ac.uk/shutel/files/2014/08/GSlides.png';            
        }else if(type == 'application/vnd.google-apps.script'){
            iconUrl = 'https://trevorfox.com/wp-content/uploads/2017/01/google-apps-script-1-e1485783800848.png';            
        }else if(type == 'application/vnd.google-apps.site'){
            iconUrl = 'https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/512/sites.png';            
        }else if(type == 'application/vnd.google-apps.spreadsheet'){
            iconUrl = 'https://www.ryerson.ca/content/dam/google/teach-with-google-apps/sign-up-sheets/sign-up-sheets-1.png';            
        }else if(type == 'application/vnd.google-apps.unknown'){
            iconUrl = 'https://cdn4.iconfinder.com/data/icons/eldorado-documents/40/document_unknown-512.png';            
        }else if(type == 'application/vnd.google-apps.video'){
            iconUrl = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/file-video-icon.png';            
        }else if(type == 'application/vnd.google-apps.drive-sdk'){
            iconUrl = 'https://cdn1.iconfinder.com/data/icons/logotypes/32/google-drive-512.png';            
        }else if(type == 'application/zip'){
            iconUrl = 'https://cdn.iconscout.com/icon/free/png-256/zip-file-format-489644.png';            
        }else if(type == 'application/pdf'){
            iconUrl = 'https://cdn1.iconfinder.com/data/icons/adobe-acrobat-pdf/154/adobe-acrobat-pdf-file-512.png';            
        }else{
            iconUrl = 'https://cdn4.iconfinder.com/data/icons/eldorado-documents/40/document_unknown-512.png';           
        }
        return iconUrl;
    }

    render(){
        const {type, name, onFileClick, id} = this.props;
        if(type == 'application/vnd.google-apps.folder'){
            return(
                <Col xs={4} md={2} sm={3} lg={2}>
                <Card className='folder-Card' onClick={(e)=>{
                    onFileClick()
                }}>
                    <CardBody>
                        <CardImg top width="80%" className='overwrite-card-img' src={this.typeIconUrl(type)} alt="Card image cap" />
                    </CardBody>
                    <CardFooter>
                        <CardTitle>{name}</CardTitle>
                    </CardFooter>
                   
                </Card>
                </Col>
            )
        }else{
            return(
                <Col xs={4} md={2} sm={3} lg={2}>
                <Card>
                    <CardBody>
                       <CardImg top width="80%" className='overwrite-card-img' src={this.typeIconUrl(type)} alt="Card image cap" />
                    </CardBody>
                    <CardFooter>
                            <CardTitle><a href={`${window.location.origin}/dev/api/gsuite/file/${id}`} >{name}</a></CardTitle>
                    </CardFooter>
                    <a href={`${window.location.origin}/dev/api/gsuite/file/${id}`} className="download-icon"><i className="fa fa-download" aria-hidden="true"></i></a>
                </Card>
                </Col>
            )
        }
    }
}

export default ShowFile;
