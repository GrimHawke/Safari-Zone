var populate_table = function(height, width) {
  for(i=0; i<height; i++) {
    for(j=0; j<width; j++) {
      var whatev = ".row" + i + ".column" + j;
      if (i==9 || i > 9 && j == Math.round(height/2)+7) {
        $(whatev).css("background-color","darkslategray");
      } else if(j==6|| j==7 || j>6 && (j+15-i) < 2 || i > height-3 && j > 4 && j < (Math.round(width/3)*2 + i - Math.round(width/2))) {
        $(whatev).css("background-color","blue");
      } else if((i+4)%7 < 5 && (j+2)%5 < 3 && (i+j)%9 < 4) {
        $(whatev).css("background-color","darkgreen")
      } else if((Math.round(i/2)*3+4)%12 > 8 && (j+2)%9 < 4 && (i*2+Math.round(j/3)*2+3)%9 < 7) {
        $(whatev).css("background-color","royalblue");
      } else if((i*3-i^2+5)%10 < 7 && (j*2+3)%9 < 7 && (i*2+j)%10 < 7) {
        $(whatev).css("background-color","green");
      } else if((i*4-i^2+4)%13 < 9 && (j*2+3)%10 < 8 && (i*2+j+5)%10 < 7) {
        $(whatev).css("background-color","saddlebrown");
      } else {
        $(whatev).css("background-color","sandybrown");
      }
    }
  }
}
