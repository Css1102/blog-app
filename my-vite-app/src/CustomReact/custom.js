customRender=(element,sibley)=>{
    /*let docEle=document.createElement(element.type)
    docEle.innerHTML=element.children;
    docEle.setAttribute('href',element.props.href)
    docEle.setAttribute('target',element.props.target);
    sibley.appendChild(docEle);*/

    // More optimized code for the same operation:

    let docEle=document.createElement(element.type)
    docEle.innerHTML=element.children;
    for(let key in element.props){
docEle.setAttribute(key,element.props[key])
}
 sibley.appendChild(docEle);
}

const reactEle={
 type: 'a',
 props:{
href: 'https://www.geeksforgeeks.org/problems/transform-to-sum-tree/1',
target:'_blank'
 },
 children:'Fuck me to visit gfg'
};


const Dom=document.getElementById('root');


customRender(reactEle,Dom);

