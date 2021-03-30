# Psulo React/Typescript Test Task

- [Psulo React/Typescript Test Task](#psulo-react-typescript-test-task)
    + [System Requirements](#system-requirements)
    * [How to Setup the Backend](#how-to-setup-the-backend)
        + [Seeding the database](#seeding-the-database)
    * [Getting Started](#getting-started)
        + [git workflow](#git-workflow)
        + [Submitting the task](#submitting-the-task)
    * [1. Cleaning up the warnings](#1-cleaning-up-the-warnings)
    * [2. Request Submit Bug](#2-request-submit-bug)
    * [3. Requests menu is not active on "Show request" and "Create new request" pages](#3-requests-menu-is-not-active-on--show-request--and--create-new-request--pages)
    * [4. New Feature: Clear Field](#4-new-feature--clear-field)
    * [5. Loading state missing](#5-loading-state-missing)
    * [6. Add errors to the form](#6-add-errors-to-the-form)
    * [7. Fix picture modal layout](#7-fix-picture-modal-layout)
    * [8. Typing Issues for CustomInput](#8-typing-issues-for-custominput)
    * [9. Server doesn't scale!](#9-server-doesn-t-scale-)
    * [10. Bug Toggling Between Categories / Trending Photos](#10-bug-toggling-between-categories---trending-photos)
    * [11. When the left-hand side menu opens, the header "blinks"](#11-when-the-left-hand-side-menu-opens--the-header--blinks-)
    * [12. Add blur-hash image skeletons](#12-add-blur-hash-image-skeletons)
    * [13. Favorite photos](#13-favorite-photos)
    * [14. Add animation to the modal window](#14-add-animation-to-the-modal-window)
    * [15. Create a light theme](#15-create-a-light-theme)
    * [16. Post-mortem](#16-post-mortem)

Thank you for taking the time to work on the Psulo Test Task for React and Typescript. Please let us know if you have feedback on the Readme or understanding the tasks described here.

### System Requirements

To start the development servers you need to have the following dependencies setup on your machine:
- Docker
- Yarn

## How to Setup the Backend

The frontend task is going to be communicating with a backend service. This backend will be mounted in a docker-image so you will need to have docker installed on your local system.

To start the Backend service, open this directory in the terminal and run docker-compose:

```
docker-compose up
```

This will start the backend server and the database.

### Seeding the database

In the next step, you will need to seed the database. To do so, run the seed file:

```
./seed.sh
```

The backend is ready for you to run! Now you need to install frontend dependencies. To do so run:

```
yarn
```

and as the last step to start the application, start the development server with

```
yarn start
```

## Getting Started

Before we get started there are a few things you should know about completing the tasks. If you run into trouble understanding what you are supposed to do, don't hesitate to email us at artem@psulo.com.

### git workflow

The test task includes 16 challenges. You can complete the tasks in whichever order you please, but each task should be commited in a single commit message.

Please start the commit message always with `exercise{number}: ` and feel free write whatever else after.

### Submitting the task

To submit your task to Psulo, you should have it in a private repository that you send to artem@psulo.com via a link to the repository or an archived repository. If you want to keep your submission private, please invite @shlajin on Github to be a collaborator.

## 1. Cleaning up the warnings

Lets get started, shall we? Once you start the project with `yarn start` you will see that our engineers have done a bad job. There are plenty of warnings in the console.

![2021-03-17_22-31-45](https://user-images.githubusercontent.com/6540703/112202217-cb6e3300-8c19-11eb-88e9-3f8a21648715.png)

### The task

You should fix all warnings. Remember to save all of your progress in this task once completed into a single commit file.

Pay attention to `src/components/PictureGrid/index.tsx`:
```js
// Missing dep: loadPictures, but it crashes the browser. Why?
  useEffect(() => {
    loadPictures(categoryId, currentPage)
  }, [currentPage, categoryId])
```
Clearly the `loadPictures` dependency is missing. But wait a minute! If we add the dependency, it crashes the application. This should be fixed.

After fixing this, please create a file called `exercise1.md` and comment in this file: Why does the `loadPictures` dependency crash the browser?

Phew, luckily we got the warnings cleaned for the project now. Hopefully other developers won't commit code with errors and warnings anymore. We would like to avoid having these warnings and comments caused by other developers in the future. What way is there to prevent this from happening in the project? Please comment this in the `exercise1.md` file.

## 2. Request Submit Bug

Oops. The previous developer left us a nasty bug. Also the Product Owner left us with a very small description of the bug and how to reproduce it.

Navigate to "Requests", then to "New picture request". Fill in these values:

- Name: **Test name**
- Year: **2021**
- Amount of pictures: **10**

Click **submit**. Browser should show the submitted request, however, it is stuck in a loading state.

### The Task

The task is to fix this bug and show the submitted request instead of being stuck in a loading state after submitting.

## 3. Requests menu is not active on "Show request" and "Create new request" pages

More bugs to be solved. On create new request page (path: /requests/new) the "Requests" links appears as inactive from styling. It should stay active for all pages under "requests" menu with the correct underscore styling.

![2021-03-17_22-48-31](https://user-images.githubusercontent.com/6540703/112202770-70890b80-8c1a-11eb-9a58-4b8f2219f90a.png)

### The Task

Your task is to fix the active state of the link and have it show the correct green underscoring when navigating any pages under the `requests` menu.

## 4. New Feature: Clear Field

Finally we get to do some feature work! On create new request page you will find 3 input fields, each having the `x` button which clears the content of the input. When user clicks on x the field should also auto-focus.

![2021-03-17_22-54-00](https://user-images.githubusercontent.com/6540703/112203062-c8277700-8c1a-11eb-83ee-a90d91244d02.png)

### The Task

Your task is to create this functionality to clear the field when the user clicks on `x`. The field should also focus when clicked.

## 5. Loading state missing

Ouch more bugs again.. When you browse different categories the website says there are no images in the category for a second, and then images appear.

Clearly the frontend thinks that there are no images until it loads some, but this is confusing to the end user.


https://user-images.githubusercontent.com/6540703/112203324-15a3e400-8c1b-11eb-879c-9754517aaa06.mp4


### The Task

You should add a "Loading" sign instead of "No pictures" disclaimer when pictures are loading. Feel free to use text, a spinner of your choosing or some other loading indication that an user understands.

## 6. Add errors to the form

Ok, back to some good old feature work. The new request form does not have any error handling, which is a very bad UX.

### The Task

You should add the form validation.

You should validate **Picture Name** synchronously, the **Picture Name** field should not be blank.

The "Year taken" and "Amount of pictures" fields are validated on the backend. You cannot know validation rules ahead of time, so you should send the data to the backend and see if there are errors.

## 7. Fix picture modal layout

Ugh, the previous developers really weren't that good.. There is a very obvious bug. Click on any picture to open it in a modal window. It looks good when I open the portrait photos, but it looks terrible on landscape photos.
![2021-02-24_20-46-49](https://user-images.githubusercontent.com/6540703/112203798-94991c80-8c1b-11eb-94bc-61688d9f90d1.png)

### The Task

You should make it this view look better. Put the description below the photo if the photo displayed is a landscape photo and fix the positioning of the image in relation to the pop-up background.

## 8. Typing Issues for CustomInput

The previous developer had some problems with type definitions when they wrote `CustomInput`. `CustomInput` defined in `src/components/Input/Input.tsx` is a nice input for text and numbers. Looking at the file we can see that the type definitions are not great.

The `value` is typed as `value: string | number`, and the `onChange` is typed as `onChange: (newValue: string | number) => void`. Generally speaking, if you pass string `value` to the component, you want to have `onChange: (newValue: string) => void`, and if you pass numeric `value`, then you want to have `onChange: (newValue: number) => void`.

This might be a problem. For example, if you open `src/routes/likes/CreateLike.tsx` you will see this piece of code:

```js
onChange={value => {
  // @ts-ignore
  setPictureId(value)
}}
```

setPictureId expects a number, not a string | number, therefore we had to disable the typecheck for this line.

Damnit wait, there is more. The CustomInput also has the type property, which indicates whether it is a numeric or text input. Since there are no restrictions, you can pass type="number" with string value or vice versa, which is clearly a mistake.

### The Task

You have to fix the typings for the `CustomInput`-component, so TypeScript correctly infers all types on its own. The issue with the `type` property should also be fixed.

As a reminder: the task does not limited you to only altering the typings. You can do whatever you would do in a real-world project to meet the goal, which is a type-safe codebase. If you feel like rewriting the component from grounds up, while maintaining the existing behavior, nobody is holding you back.

## 9. Server doesn't scale!

Ok, I think we have a few bugs up ahead. Every time we load the `By Category`-page, it fetches two pages of pictures. It puts additional strain on our servers.

https://user-images.githubusercontent.com/6540703/112204630-8bf51600-8c1c-11eb-8f0f-42dcfa17ae65.mp4

### The Task

Make sure only one page is loaded on the initial load.

## 10. Bug Toggling Between Categories / Trending Photos

The product manager has given you the following bug description
```
If I click very fast between these 2 I occasionally will get 
wrong pictures displayed. E.g. in the reference video I get 
pictures of mountains when requested animal pictures.
```

https://user-images.githubusercontent.com/6540703/112204701-a3cc9a00-8c1c-11eb-9311-74c95cf1db45.mp4

### The Task

Your task is to fix the issue based on the description given by the Product Manager (he needs to start writing better bug reports).

## 11. When the left-hand side menu opens, the header "blinks"

Ok, I swear this is the last bug. No more after this. We noticed that when the left-hand side menu opens up, the header "blinks". This happens only one time when I open the left categories menu. You can see it happening from this video:


https://user-images.githubusercontent.com/6540703/112205120-25bcc300-8c1d-11eb-9fea-5f496bf00ad2.mp4



### The Task

You guessed it.. We need to fix this one last bug.

## 12. Add blur-hash image skeletons

Ok lets get back to some nice and cool feature work. Our application looks bad when we load new pictures. The content jumps around and continues to jump as images load. This video shows how weird it looks now:

https://user-images.githubusercontent.com/6540703/112205389-674d6e00-8c1d-11eb-955c-43778a9d347b.mp4



### The Task

You should improve this feature by adding loading skeletons so there is some "fake" content until you get the images list. Then, use `blurhash` to create a nice blurry image while the images load.

Blur hash reference: [https://blurha.sh/](https://blurha.sh/)


## 13. Favorite photos

Lets keep the feature train going! We want to add a favorite photos feature. Each photo can be added to the favorite list, and removed from there. API is not super fast and fails sometimes due to unknown reasons, yet we want to deliver the greatest UX possible, so you'll have to add optimistic updates.

![2021-03-17_23-33-26](https://user-images.githubusercontent.com/6540703/112205501-84823c80-8c1d-11eb-8283-9e363f845014.png)


### The Task

To complete this feature you should:

- Rollback on server error
- Protect from quitting until all requests are processed

You can navigate to the `Likes API Tester` section to play around with API a little.

## 14. Add animation to the modal window

Ok, we are getting close to being done making this application from zero to hero. Next up is another cool new feature. When you click on a picture on in Trending Photos or By Category, it opens the picture in a modal window.

### The Task

You should add an animation to the modal window opening transition to make it look nicer.

## 15. Create a light theme

Ok I swear, only cool stuff as the last feature work. Sometimes it's bright outside and you don't want to be surrounded by the darkness. To fix this we should add a Light Theme to the applicaiton!

### The Task

Add a toggle to the website which will change the theme of the website from dark to light. Make sure theme persist across visits. (Store this setting locally.)

## 16. Post-mortem

Whew, you made it! At this point we would like to hear from you. The codebase is not great. It specifically incorporated some issues, it has some bad practices and a few suboptimal solutions.

What are the problems of the codebase? What kind of implementations did you see in the code base that ou did now like? How would you improve it?

Add a new file called `exercise16.md` to the repository where you document these answers.
