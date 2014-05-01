#### Include an inline screenshot of your codeschool's points from the profile page:

<!-- Modify the Markdown to include your answers. Don't delete the questions! -->

My code school screeen shot of points http://postimg.org/image/v3xd6mbsj/

##QUIZ
* Explain which tabs support the following actions and how.
  * Realtime editing of HTML and CSS 
    - The elements tab. 
      The 'elements' tab supports the html actions, which essentially provides the developer with the elements used in his/her html text/code. Once you're in the elements tab the html elements for the webpage will appear, after which we can either hover over the html line and the webpage itself will highlight the area(s) you highlight, so you have a better understanding, if you did not already, as to where the html line appears on the web page. Or instead of hovering, we can click the html text in the 'elements' tab which brings us to the CSS. Since the window on the developer tool is one, but split vertically in half the other side, being the right, has a 'style' tab we can click. Now when we click the 'elements' tabs then click a line of html text we can see the CSS styling on the right where everything & anything can be edited from margins to font sizes. In order to edit the styling of your web page you can just click inside of the brackets of which ever selector you choose. If you want to add a new selector to the 'styles' tab we can do that to! Below the 'style' tab there will always be a selector named element.style{}, next to that there is a '+' button, click this and you're ready to roll.
 
* Javascript Debugging
  - The console tab. 
    If you're having an issue with your webpage you can simply open up the developer tools tab and view your error message that appears inside of the 'sources' tab which is adjacent to the 'elements' tabs. Once the error appears, you can click the link in red which will direct you to that error (the error will appear at the bottom box). Essentially we want to see the state of the code while its paused so we can examine the variables, we execute this step by clicking on the 'pause on exception' icon on the upper right. So while the code is paused we can see the error. Then we want to refresh the browser with the 'pause on expception' selected this will pause within the jquery file and the file will be minifed, so the code is simplified for less white and better web page speed. This will make debugging difficult if chrome web tools wasn't handy. So next we'd click the brackets on the bottom which will expand our code and take us directly to the error in the code. Then we want to click the line of code that the error and run the code again. You will need to know Javascript to fix/debug the code. 

* Performance Optimization 
  - The network tab. 
    This is supported by the the page speed app that the chrome dev tools offer. This checks the speed of the web page. This will display the how you can minimize the payload but showing which files can be minifed (reduce long parameter names, rid white space, & other optimization to shrink the code). In order to access those files or view them you want to click the 'Network' tab. After which choose the files and compile them into google compiler which will then let you rename the files as one. You can then use that file name in your JS code to optimize performance. It's crucial to optimize performance for better web page speed and less lag. 

* What's the quick key for your OS to spawn the Dev Tools inspector?
  - Command Option i

* Go to http://www.postmachina.com/ and analyze and tweak this nicely designed page.
  * What is the current background color for the page?  (Surprisingly, it's not just black!)
    -According to its hash label the color is identified as a combination of cyan, magenta, yellow & black. In RBG its red, green and blue. 

  * Tweak the background color to white.
    -Check

  * Tweak the height of the side bar that contains the logo.  Shrink it down to 85px.
    -Check

  * Roll over the navigation links.  When you hover over them, they dissapear.  Let's change the hover color to black instead.
    -Check

  * Now take a screenshot of your new (and maybe not so improved) design.  It should match this screenshot: http://postimg.org/image/5ak1jkpl5/
    -Check

  * Upload your own image to the web using an image hosting service.  It should match the image above. The last nav link in the image above is black because the mouse was hovering there when the screenshot was taken. Do the same, and don't take a screenshot of your whole desktop, just the browser window. (This is part of the challenge.)
    -Check: http://s29.postimg.org/6b7bpdevr/Screenshot_2014_05_01_12_41_22.png

* For the postmachina website, why can't you tweak the color of the text "The most important things are not things"?  Please explain.
  -Because html is text, this is not text this is simply an image.  

* Go to www.ticketswizard.com and analyze the page.  
  * What is the largest image on the website? 
    -980px by 165px, Background of the tickets wizard logo
  * Explain how you would find out this information, and list the URL of offending image here and how big it is.
    - Went to resources and scrolled through the pix to identify the largest one. 
    -  http://www.ticketswizard.com/App_Themes/PXS_Demo/Images/HeaderBG.png

* Test the www.ticketswizard.com website with google's [PageSpeed Insights](http://www.ticketswizard.com/).  (You can also download the chrome plugin).  What is the lowest hanging fruit to optimize the website?  How many kilobytes of data can be eliminated?
  
    -The lowest hanging fruit during the speed test to optimize the website was to minimize size request, specify image dimensions, and put css in the document head. 
    - Totaling 16.8 KiB  of data eliminated. 





















