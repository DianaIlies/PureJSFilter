const folders =
{
    type: 'dir',
    name: 'app',
    children: [
        {
            type: 'file',
            name: 'index.html'
        },
        {
            type: 'dir',
            name: 'js',
            children: [
                {
                    type: 'file',
                    name: 'main.js'
                },
                {
                    type: 'file',
                    name: 'app.js'
                },
                {
                    type: 'file',
                    name: 'misc.js'
                },
                {
                    type: 'dir',
                    name: 'vendor',
                    children: [
                        {
                            type: 'file',
                            name: 'jquery.js'
                        },
                        {
                            type: 'file',
                            name: 'underscore.js'
                        }
                    ]
                }
            ]
        },
        {
            type: 'dir',
            name: 'css',
            children: [
                {
                    type: 'file',
                    name: 'reset.css'
                },
                {
                    type: 'file',
                    name: 'main.css'
                }
            ]
        }
    ]
};


function showHierarchy(myFolders, strIn) {
    var x = document.getElementById("myID");
    var str = "";


    if (myFolders.name.match(strIn) && myFolders.type === "dir") {
        str = goodHierarchy(myFolders);
    }
    else {
        if (myFolders.type === "dir" && myFolders.name.match(strIn) !== null)
            str += "<li class ='folder-item'>" + myFolders.name + "</li>";

        for (var j = 0; j < myFolders.children.length; j++) {
            if (myFolders.children[j].type === "dir" && (myFolders.children[j].name.match(strIn) !== null || strIn === null)) {
                str+= showHierarchy(myFolders.children[j], strIn);
            }

            else if (myFolders.children[j].type === "dir") {
                str += showHierarchy(myFolders.children[j], strIn);

            }
            else if (myFolders.children[j].type === "file") {
                if (myFolders.children[j].name.match(strIn) != null || strIn == null) {
                    str += "<li class ='file-item'>" + myFolders.children[j].name + "</li>";
                }
            }
        }
    }
    str += "</ul>";
    return x.innerHTML = str;
}


function goodHierarchy(myFolders) {
    var x = document.getElementById("myID");
    var j = 0;
    var str = "";

    str += "<li class ='folder-item'>" + myFolders.name + "</li>";


    while (j < myFolders.children.length) {
        if (j === 0)
            str += "<ul>";
        if (myFolders.children[j].type === "dir") {
            str += goodHierarchy(myFolders.children[j]);
        }


        else if (myFolders.children[j].type === "file") {
            str += "<li class ='file-item'>" + myFolders.children[j].name + "</li>";
        }
        j++;
    }
    str += "</ul>";
    return x.innerHTML = str;
}


showHierarchy(folders);

function render(strIn) {
    var x = document.getElementById("myID");
    return x.innerHTML =showHierarchy(folders, strIn);
}

function searching() {
    var strOut = "";
    var strIn = document.getElementById("input_id").value;
    if (strIn != "") {
        strOut += "Searching for:" + strIn;
        document.getElementById("searching").innerHTML = strOut;
        document.getElementById("searching").style.display = "block";
    }
    else {
        document.getElementById("searching").style.display = "none";
    }
}


function main() {
    var strIn = document.getElementById("input_id").value;
    if (strIn != null) {
        render(strIn);
        searching();
    }
}