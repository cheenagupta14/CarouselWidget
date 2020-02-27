# CarouselWidget
A mobile-first carousel widget that cycles through six images using prev and next button

This application is created using React. For initial setup npm create-react-app command is used .
React components are created under src/components folder .
 - Carousel component is created to display the carousel widget . 
   For this application image dimension displayed for desktop is 200 X 200 
 - Created Loading spinner component using css to show "loading" when we are awaiting response from server .
 - ErrorDialog is a simple component to display error

# How to run the app
 - Download/ clone the git repository
 - npm install
 - npm start
  App will run on http://locahost:3000  

# Package Included
- prop-types: adding type check on props of components
- react-test-renderer:  testing react components
- react and react-dom : Building react components 
- nock: mocking API calls
- node-saas: adding saas files 

# tests
Because of time constraint Unit tests is writtten only for carousel component (src\components\Carousel\carousel.test.js)
Following scenarios are covered in the test :
1) UI is rendered
2) click on Previous & next button changes active items in carousel
3) Layout change for mobile and desktop
4) if fetch call fails error is displayed

To run tests use "npm run test" command
