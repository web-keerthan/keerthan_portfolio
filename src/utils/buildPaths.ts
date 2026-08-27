import { straightPath, curvedPathLeft, curvedPathRight} from '../utils/vehiclePath';

export function buildPaths(path:any, cards:any, header:any, content:any, scale:number, offset:number ){
    if (!path || !header || cards.length === 0 || !content) return;
    path.innerHTML = '';

    const containerRect = path.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    const contentRect = content.getBoundingClientRect();

    const startPoint = {
        x: headerRect.left + headerRect.width / 2 - containerRect.left,
        y: headerRect.bottom - containerRect.top + 30
    };

    const endPoint = {
        x:startPoint.x,
        y:contentRect.bottom - containerRect.top - 0.1 *window.innerHeight
    };

    const curvedPaths :any[]=[];

    cards.forEach((card:any, index:any) => {
        const cardRect = card.getBoundingClientRect();
        const isEven = index % 2 === 0;
        
        if(isEven){
            curvedPaths.push({
                number: index + 1,
                x1:startPoint.x,
                y1:cardRect.top + cardRect.height / 2 - containerRect.top,
                x2:cardRect.left -containerRect.left,
                y2:cardRect.top + cardRect.height / 2 - containerRect.top + offset
            })
        }
        else{
            curvedPaths.push({
                number: index + 1,
                x1:startPoint.x,
                y1:cardRect.top + cardRect.height / 2 - containerRect.top,
                x2:cardRect.right - containerRect.left,
                y2:cardRect.top + cardRect.height / 2 - containerRect.top + offset
            })
        }
    });

    const straightSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    straightSvg.id = "straight-path";
    straightSvg.setAttribute("class","absolute inset-0 w-full h-full pointer-events-none");
    straightSvg.innerHTML += straightPath(startPoint.x, startPoint.y, endPoint.y);
    path.appendChild(straightSvg);

    curvedPaths.forEach((item:any) => {
        const curvedSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        curvedSvg.id =`curved-path-${item.number}`;
        curvedSvg.setAttribute("class","absolute inset-0 w-full h-full pointer-events-none");
        if(item.number % 2 !== 0){
            curvedSvg.innerHTML += curvedPathRight(item.x1, item.y1, item.x2, item.y2,scale );
            path.appendChild(curvedSvg);
        }
        else{
            curvedSvg.innerHTML += curvedPathLeft(item.x1, item.y1, item.x2, item.y2,scale );
            path.appendChild(curvedSvg);
        }
    });
}