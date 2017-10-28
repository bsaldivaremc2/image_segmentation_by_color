# Image segmentation by color Javascript library
You can see this running on my blog:

http://bsaldivards.blogspot.pe/2017/10/image-segmentation-by-color-mean-and.html

I present an online segmentation javascript implementation of segmentation given the r,g,b means an standard deviation of each one. Since it is javascript it means it will run on your browser using your computation power, thus, you should test it with small images first.  

The pixels that fall in the range [ mean - std; mean + std ] will remain in the visualization. Those who don't, will be turned into black. The std factor will multiply the std value of every channel. It is easier to follow the changes by changing a factor than the std values independently. 

