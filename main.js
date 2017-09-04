onload=function () {
    var imgs=document.getElementsByTagName("img");
    var can=document.getElementById("can");
    var clockbackground=document.getElementById("clockbackground");//slide
    var cw=can.offsetWidth/2;
    var ch=can.offsetHeight/2;
    var draw=can.getContext("2d");
    var pic=new Image();
    var parts={},index=0;
    var tempstr="00000000000000";////////////////////////////
    var tt=0;
    var pindex=0;
    pic.src="img/aa.png";
    pic.onload=function () {

        clock();
    }
    function clock() {
        var t=new Date();
        var h=t.getHours();
        var m=t.getMinutes();
        var s=t.getSeconds();

        var str=t.getFullYear()+toD(t.getMonth()+1)+toD(t.getDate())+toD(h)+toD(m)+toD(s);///////////////////

        for (var i=0;i<imgs.length;i++)
        {imgs[i].src="img/"+str.charAt(i)+".png";
        if (tempstr.charAt(i)!=str.charAt(i)){

            imgs[i].style.transform = imgs[i].style.transform == "rotateY(360deg)"?"rotateY(0deg)":"rotateY(360deg)"//////////////
        }

        }
        tempstr=str;//slide
        if (t-tt>=2000){
            tt=t;
            clockbackground.style.background="url(img/slide"+pindex+".jpg)";
            clockbackground.style.backgroundSize="600px 600px"
            pindex=(pindex+1)%3;
        }
        draw.clearRect(0,0,cw*2,ch*2);
        draw.beginPath();
        draw.lineWidth=3;
        draw.arc(cw,ch,cw,0,6.28);
        draw.save();
        draw.translate(cw,ch);
        for (var i=0;i<360;i+=6)
        {
            if (i%30==0)
                draw.moveTo(0,ch-20);
            else
                draw.moveTo(0,ch-10);
            draw.lineTo(0,ch);
            draw.rotate(6/360*6.28);
        }
        draw.closePath();
        draw.stroke();
        draw.restore();
        draw.lineWidth=1;
        draw.textAlign="center";
        draw.textBaseline="middle"
        draw.font="Bold 20px Arial";
        draw.fillStyle="black";
        var k=[3,4,5,6,7,8,9,10,11,12,1,2];
        for (var i=0;i<360;i+=30)
        {
            draw.fillText(k[i/30]+"",cw+Math.cos(i/360*6.28)*(cw-40),cw+Math.sin(i/360*6.28)*(cw-40));
        }

        draw.save();
        draw.translate(cw,ch);
        draw.save();
        draw.rotate((h+m/60)%12/12*6.28);

        draw.drawImage(pic,-10,0,20,-cw+40);

        draw.restore();
        draw.save();
        draw.rotate(m/60*6.28);

        draw.drawImage(pic,-10,0,20,-cw+20);

        draw.stroke();
        draw.restore();

        draw.restore();
        for (var i=0;i<cw;i+=10)
        {draw.beginPath();
           parts[index++]=new part(cw+Math.cos(s/60*6.28-1.57)*i,cw+Math.sin(s/60*6.28-1.57)*i,~~(Math.random()*5),"#"+((Math.random()*0xffffff)>>0).toString(16),~~(Math.random()*8)-4);
        }
        for (var i in parts)
        {
            parts[i].drawimg();
            parts[i].r-=0.1;
            draw.beginPath();
            draw.arc(cw,ch,cw-10,0,6.28);
            draw.closePath();
            if (draw.isPointInPath(parts[i].x,parts[i].y)){
           // var data=draw.getImageData(parts[i].x,parts[i].y+parts[i].r,1,1).data;
           //         if (data[0]!=0&&data[1]!=0&&data[2]!=0) {


         //   if (parts[i].y>ch*2-20) {
                parts[i].pre=parts[i].y;
                parts[i].y+=5*(parts[i].t++);

                parts[i].x+=parts[i].v;
            }
            else
            parts[i].y+=1;




            if (parts[i].r<=0) delete parts[i];
        }


        setTimeout(arguments.callee,100);
    };
function part(x,y,r,c,v) {
    this.x=x;
    this.y=y;
    this.r=r;
    this.t=1;
    this.v=v;
    this.c=c;
    this.pre=0;
}
part.prototype.drawimg=function () {
    draw.beginPath();
    draw.arc(this.x,this.y,this.r,0,6.28);
    draw.closePath();
    draw.fillStyle=this.c;
    draw.fill();
}

}
function toD(x) {
    if (x<10) return "0"+x;
    else
        return x.toString();
}