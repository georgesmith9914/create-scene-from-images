$( document ).ready(async function() {
    console.log( "ready!" );

    var queries = {};
    $.each(document.location.search.substr(1).split('&'),function(c,q){
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
    });
    console.log(queries);

    var scene_uuid = queries.scene_uuid;

    var defaultContents = (await $.ajax({url: "defaultcontents", success: function(result){}}).promise()).defaultContents;
    console.log(defaultContents);

    var environmentContents = (await $.ajax({url: "environmentContents?scene_uuid=" + scene_uuid, success: function(result){}}).promise()).environmentContents;
    console.log(environmentContents);

    var sceneContents = (await $.ajax({url: "sceneContents?scene_uuid=" + scene_uuid, success: function(result){}}).promise()).sceneContents;
    console.log(sceneContents);

    var assets = (await $.ajax({url: "assets?scene_uuid=" + scene_uuid, success: function(result){}}).promise()).assets;
    console.log(assets);

    /*var templates = [
        {
            "type": "scene_background",
            "template": "sechelt",
            "material_content_type": "img",
            "material_content_src": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
            "material_content_key" : "#skyTexture"
        }
    ]*/

    /*var assets = [
        {
            "id": "ambient_music",
            "type": "audio",
            "src": "./audio/summer-dance-time-10538.mp3",
            "crossOrigin": ""
        },
        {
            "id": "thumbEgypt",
            "type": "img",
            "src": "img/artwork-440x440.jpg",
            "crossOrigin": "anonymous"
        },
        {
            "id": "giftatree",
            "type": "img",
            "src": "img/plant-a-billion-gift-a-tree.jpg",
            "crossOrigin": "anonymous"
        },
        {
            "id": "messageText",
            "type": "a-asset-item",
            "src": "message.html",
            "crossOrigin": ""
        },
        {
            "id": "skyTexture",
            "type": "img",
            "src": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
            "crossOrigin": ""
        },
        {
            "id": "groundTexture",
            "type": "img",
            "src": "https://cdn.aframe.io/a-painter/images/floor.jpg",
            "crossOrigin": ""
        },
        {
            "id": "katty1",
            "type": "img",
            "src": "img/katyperrylange-haare-gettyimages-1142115630.jpg",
            "crossOrigin": ""
        },
        {
            "id": "katty2",
            "type": "img",
            "src": "img/katty2.jpg",
            "crossOrigin": ""
        },
        {
            "id": "katty3",
            "type": "img",
            "src": "img/katty3.jpg",
            "crossOrigin": ""
        }
    ]*/

    /*var environmentContents = [
        {
            "type": "scene_background",
            "template": "sechelt",
            //"material_content_type": "img",
            //"material_content_src": "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
            "material_content_key" : "#skyTexture"
        },
        {
            "type": "scene_ground",
            "template": "floor",
            //"material_content_type": "img",
            //"material_content_src": "https://cdn.aframe.io/a-painter/images/floor.jpg",
            "material_content_key" : "#groundTexture"
        }
    ] */

    /*var sceneContents = [

        {
            "type": "headline",
            "template": "default",
            "material_content_type": "img",
            "material_content_src": "img/artwork-440x440.jpg",
            "material_content_key" : "img/artwork-440x440.jpg",
            "link": "https://tr.lnk.to/WhereWeStarted_trackKP",
            "id": "elmo",
            "sound_src": "audio/summer-dance-time-10538.mp3",
            "position": "0 2 -1.0",
            "rotation": "30 30 10",
            "scale": "1.5 1.5 1.5" 
        },
        {
            "type": "link",
            "template": "default",
            "material_content_type": "img",
            "material_content_src": "img/plant-a-billion-gift-a-tree.jpg",
            "material_content_key" : "#giftatree",
            "link": "https://tr.lnk.to/WhereWeStarted_trackKP",
            "text": "Gift a tree",
            "id": "",
            "position": "2.5 2 -1.0",
            "rotation": "",
            "scale": "" 
        },    
        {
            "type": "video",
            "template": "default",
            "material_content_type": "img",
            "material_content_src": "img/katyperrylange-haare-gettyimages-1142115630.jpg",
            "material_content_key" : "#katty1",
            "link": "https://ffm.to/mjw_showsometeeth.hjg",
            "id": "",
            "position": "4 1 -1.0",
            "rotation": "0 60 0",
            "scale": "1 1 1" 
        },
        {
            "type": "video",
            "template": "default",
            "material_content_type": "img",
            "material_content_src": "img/katty2.jpg",
            "material_content_key" : "#katty2",
            "link": "https://www.youtube.com/watch?v=led8kSxI4DA",
            "id": "",
            "position": "24.06958 0.76223 9.29935",
            "rotation": "0 59.99999999999999 0",
            "scale": "1.5 1.5 1.5" 
        },
        {
            "type": "video",
            "template": "default",
            "material_content_type": "img",
            "material_content_src": "img/katty3.jpg",
            "material_content_key" : "#katty3",
            "link": "https://www.youtube.com/watch?v=led8kSxI4DA",
            "id": "",
            "position": "-16.36234 2.56164 -19.8249",
            "rotation": "",
            "scale": "1.5 1.5 1.5" 
        }
    ]*/

/*var defaultContents = [
    {
        "type": "cursor",
        "template": "default",
        "position": "0 4 -1.0"
    },
    {
        "type": "leftHandControl",
        "template": "default"
    },
    {
        "type": "rightHandControl",
        "template": "default"
    }
    {
        "type": "musicbutton",
        "template": "default",
        "id": "music-button",
        "material_content_type": "img",
        "material_content_src": "youtube.png",
        "material_content_key" : "youtube.png",
        "position": "0 6 -2",
        "rotation": "",
        "scale": "1 1 1"         
    } 
]*/

    //Create empty scene
    $("body").
        append('<a-scene' +
                ' raycaster="far: 100; objects: [link];"' +
                ' cursor="rayOrigin: mouse"' +
                ' camera-position' +
                ' environment' +
                ' info-message="htmlSrc: #messageText">' +
                '</a-scene>'
            );

    //Load assets in the asset management system
    $("a-scene").
    append('<a-assets>' +
            '</a-assets>'
    )   

    for(var assetCounter=0; assetCounter < assets.length; assetCounter++){
        $("a-assets").
        append('<' + assets[assetCounter].type + 
                ' id="' + assets[assetCounter].id + '" src="' + assets[assetCounter].src +'">' +
                '</' + assets[assetCounter].type +'>' 
        )  
    }

    //Add default contents
    for(var defaultContentsCounter=0; defaultContentsCounter < defaultContents.length; defaultContentsCounter++){
        if(defaultContents[defaultContentsCounter].type =="cursor" && 
                defaultContents[defaultContentsCounter].template =="default"){
            $("a-scene").
            append('<' + "a-entity"  + 
                    ' cursor position="0 4 -1.0">' +
                    ' </' + "a-entity" +'>' 
            )  
        }else if(defaultContents[defaultContentsCounter].type =="musicbutton" && 
                defaultContents[defaultContentsCounter].template =="default"){
            $("a-scene").
            append('<' + "a-entity"  + 
                    ' id="' + defaultContents[defaultContentsCounter].id  + '"' +
                    ' geometry="primitive: box"' +
                    ' material="' + 'src: '  + defaultContents[defaultContentsCounter].material_content_key  + '"' +
                    ' position="' + defaultContents[defaultContentsCounter].position +'"' +
                    ' scale="' + defaultContents[defaultContentsCounter].scale +'"' +'">' +
                    '</' + "a-entity" +'>' 
            )  
        }
    }


    //Add environment
    for(var environmentAssetCounter=0; environmentAssetCounter < environmentContents.length; environmentAssetCounter++){
        if(environmentContents[environmentAssetCounter].type =="scene_ground" && 
                environmentContents[environmentAssetCounter].template =="floor"){
            $("a-scene").
            append('<' + "a-plane"  + 
                    ' src="' + environmentContents[environmentAssetCounter].material_content_key  + '"' +
                    ' rotation="-90 0 0" width="30" height="30" repeat="10 10"' +'">' +
                    '</' + "a-plane" +'>' 
            )  
        }else if(environmentContents[environmentAssetCounter].type == "scene_background" && 
                environmentContents[environmentAssetCounter].template =="sechelt"){
            $("a-scene").
            append('<' + "a-sky" + 
                    ' src="' + environmentContents[environmentAssetCounter].material_content_key +'">' +
                    '</' + "a-sky" +'>' 
            )  
        }
    }

    //Add scene contents
    for(var sceneAssetCounter=0; sceneAssetCounter < sceneContents.length; sceneAssetCounter++){
        if(sceneContents[sceneAssetCounter].type =="headline" && 
            sceneContents[sceneAssetCounter].template  =="default"){
            $("a-scene").
            append('<' + "a-entity"  + 
                    ' id="' + sceneContents[sceneAssetCounter].id  + '"' +
                    ' link="' +  'href: '  + sceneContents[sceneAssetCounter].link  + '"' +
                    ' geometry="' + 'primitive: box'  + '"' +
                    ' material="' + 'src:'  + sceneContents[sceneAssetCounter].material_content_key  + '"' +
                    ' sound="' + 'src: url('  + sceneContents[sceneAssetCounter].sound_src + '); on: click'  + '"' +
                    ' position="' + sceneContents[sceneAssetCounter].position +'"' +
                    ' rotation="' + sceneContents[sceneAssetCounter].rotation +'"' +
                    ' scale="' + sceneContents[sceneAssetCounter].scale +'"' +'">' +
                    '</' + "a-entity" +'>' 
            )  
        }else if(sceneContents[sceneAssetCounter].type =="link" && 
                    sceneContents[sceneAssetCounter].template  =="default"){
            $("a-scene").
            append('<' + "a-entity"  + 
                    ' position="' + sceneContents[sceneAssetCounter].position +'"' + '>' +
                    ' <a-text value="'+ sceneContents[sceneAssetCounter].text +'" position="-0.5 0.7 0"></a-text>'  +
                    ' <a-entity geometry="primitive: sphere" radius="1" link="href: '+ sceneContents[sceneAssetCounter].link  +';"  material="src: '+  sceneContents[sceneAssetCounter].material_content_key +'" scale="0.5 0.5 0.5"></a>' +
                    '</' + "a-entity" +'>' 
            )               
        }else if(sceneContents[sceneAssetCounter].type =="video" && 
                    sceneContents[sceneAssetCounter].template  =="default"){
            $("a-scene").
            append('<' + "a-curvedimage"  + 
                    ' src="' + sceneContents[sceneAssetCounter].material_content_key +'"' + 
                    ' link="href: ' + sceneContents[sceneAssetCounter].link +'"' + 
                    ' height="5.0" radius="3" theta-length="76"' +
                    ' position="' + sceneContents[sceneAssetCounter].position +'"' +
                    ' rotation="' + sceneContents[sceneAssetCounter].rotation +'"' +
                    ' scale="' + sceneContents[sceneAssetCounter].scale +'"' +'">' +
                    '</' + "a-curvedimage" +'>' 
            )               
            }
    }
    

    //Add event handler for scene click to play music
    document.querySelector('a-scene').addEventListener('click', function() {
        // Refresh stuff would go here!
        console.log("scene clicked");
        var entity = document.querySelector('[sound]');
        entity.components.sound.playSound();
        //entity.components.sound.stopSound();
    });

    document.querySelector('a-scene').addEventListener('doubleclick', function() {
        // Refresh stuff would go here!
        console.log("scene doubleclicked");
        var entity = document.querySelector('[sound]');
        entity.components.sound.stopSound();
        //entity.components.sound.stopSound();
    });

});