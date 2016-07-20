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

// afiseaza ierarhia si in acelasi timp face si search
// se adauga la string-ul "str" doar directoarele/fisierele care contin string-ul introdus
// daca se face match pe numele unui director => se apeleaza functia allHierarchy
// altfel, intr-o bucla for care parcurge fiecare copil avem 2 ramuri
//          1 - este director => se apeleaza recursiv
//          2 - este fisier => se adauga la str fisierul
//

function showHierarchy(myFolders, strIn) {
    var x = document.getElementById("myID");
    var str = "";

    if (myFolders.name.match(strIn) && myFolders.type === "dir") {
        str = allHierarchy(myFolders);
    }
    else {
        for (var j = 0; j < myFolders.children.length; j++) {
            if (myFolders.children[j].type === "dir") {
                str += showHierarchy(myFolders.children[j], strIn);
            }
            else if (myFolders.children[j].type === "file") {
                if (myFolders.children[j].name.match(strIn) != null) {
                    str += "<li class ='file-item'>" + myFolders.children[j].name + "</li>";
                }
            }
        }
    }
    return x.innerHTML = str;
}

// se apeleaza doar cand string-ul cautat se gaseste intr-un folder
// => trebuie sa se afiseze tot folderul cu tot cu fisierele continute
// similara cu showHierarchy, dar nu mai verifica string-ul introdus
function allHierarchy(myFolders) {
    var x = document.getElementById("myID");
    var j = 0;
    var str = "";

    str += "<li class ='folder-item'>" + myFolders.name + "</li>";

    while (j < myFolders.children.length) {
        if (j === 0)
            str += "<ul>";
        if (myFolders.children[j].type === "dir") {
            str += allHierarchy(myFolders.children[j]);
        }


        else if (myFolders.children[j].type === "file") {
            str += "<li class ='file-item'>" + myFolders.children[j].name + "</li>";
        }
        j++;
    }
    str += "</ul>";
    return x.innerHTML = str;
}


showHierarchy(folders, "");

function render(strIn) {
    var folderContainer = document.getElementById("myID");
    return folderContainer.innerHTML = showHierarchy(folders, strIn);
}

// functie pentru afisearea mesajului "Searching for: ..." cand textField-ul de input nu este gol
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