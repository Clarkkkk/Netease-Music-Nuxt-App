# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

# 1.0.0-alpha.2    (2023-07-09)


## **Features**

* finish my-music page ([f8c14bf6](https://github.com/Clarkkkk/Netease-Music-App/commit/f8c14bf6694ba60b947eeafd55fa42c6eab444fe))
    
    ### **Description**
    
    - favorite songs
    - recent songs
    - user info
    - useLoginService to provide two hooks: onProfileLoaded, onLoggedIn
    - add my music in navbar
    - related apis
    - add a slot in SongItem
    
* scrollable album list with beautiful and fluent animation ([0efb9e9f](https://github.com/Clarkkkk/Netease-Music-App/commit/0efb9e9f44cd624132451ff6e053f368e02e7f7b))
* play the songlist right in the search results or songlist page ([d86c992b](https://github.com/Clarkkkk/Netease-Music-App/commit/d86c992b65b051f9d01ccb01053cbceab9ba672d))
* search pages ([fb1b312c](https://github.com/Clarkkkk/Netease-Music-App/commit/fb1b312c9ef1c57d5b3b25a6a9774ae3f407d9d0))
    
    ### **Description**
    
    - search input on Nav
    - search input transition during routing
    - mixed search result including songs, songlists and albums
    - add padding at the bottom for mini music bar
    
* album page ([d81bf1ae](https://github.com/Clarkkkk/Netease-Music-App/commit/d81bf1aea6daf9dccbf5ef7e4b5c626429c85663))

## **Bug Fixes**

* fix some ui problems ([a2b9aa4a](https://github.com/Clarkkkk/Netease-Music-App/commit/a2b9aa4a2d11ff07fad8fcd4c22e6659d9665045))
* fix z-index problems of album list ([30dec766](https://github.com/Clarkkkk/Netease-Music-App/commit/30dec7669e39fd193df1ce5556f21a1a272523c0))
* minor fixes ([6d997c04](https://github.com/Clarkkkk/Netease-Music-App/commit/6d997c04c79a31d99cd87469888258bf287b080c))
    
    ### **Description**
    
    - redirect to `/` when enter `index.html`
    - hide recommended modules when not logged in
    
* use https in profile images ([240afbef](https://github.com/Clarkkkk/Netease-Music-App/commit/240afbef23400c075a290180ad859598217bee14))
* fix type error ([13961d45](https://github.com/Clarkkkk/Netease-Music-App/commit/13961d452d8b5369d3c9e467bf636abcf5533b12))

## **Styles**

* add view transitions for MiniMusicControl and playing page ([15441b61](https://github.com/Clarkkkk/Netease-Music-App/commit/15441b615a57b7fe8799e0f079757586319b2ec2))
* adjust the ui of homepage ([e5f7b18e](https://github.com/Clarkkkk/Netease-Music-App/commit/e5f7b18e3dd6d9ac5b12c4d34795decc0ec55ef6))
* make search input transitions smoother ([9d76e353](https://github.com/Clarkkkk/Netease-Music-App/commit/9d76e3536a0738e2c6e738786ea5d17d3d804492))

## **Chores**

* update typescript eslint ([3f79e722](https://github.com/Clarkkkk/Netease-Music-App/commit/3f79e72245c2adc471fb2191cf906bb7bf746d62))
* add LICENSE ([afacec0d](https://github.com/Clarkkkk/Netease-Music-App/commit/afacec0d1844f41e6bf7e24b40a12d9986fef72c))



# 1.0.0-alpha.1    (2023-06-25)


## **Features**

* ui improvements ([f3a28e59](https://github.com/Clarkkkk/Netease-Music-App/commit/f3a28e590203e4e9364f9b768f8a5ac2fc31d48c))
* add gradient in songlist page ([50403268](https://github.com/Clarkkkk/Netease-Music-App/commit/504032683702bda74896be7023ee1c8a12b46f31))
* new songs in homepage and ui improvements ([a883f4ae](https://github.com/Clarkkkk/Netease-Music-App/commit/a883f4ae0b7b6103034ebe2db77c7addf2a93e01))
* RecommandSonglists ui ([4858e068](https://github.com/Clarkkkk/Netease-Music-App/commit/4858e068abd5ce07b7c1f7d308d93fd7ee23ca3e))
* improve ui and ux in MiniMusicControl ([e8e9e074](https://github.com/Clarkkkk/Netease-Music-App/commit/e8e9e0744c8d8de4c1c14ac053cef0e0657bf0d2))
* add KeepAlive to RouterView ([f853bf0e](https://github.com/Clarkkkk/Netease-Music-App/commit/f853bf0ed991bb4b0f756337ae57b0b4e60bd76b))
* play all songs for RecommandSongs ([260f2f8b](https://github.com/Clarkkkk/Netease-Music-App/commit/260f2f8b1f4874e92090c94baae7cbe2582536cd))
    
    ### **Description**
    
    - fix a problem when switch between radio and songs
    - improve some ui
    
* click mini control to go to playing page ([a26a6fa9](https://github.com/Clarkkkk/Netease-Music-App/commit/a26a6fa98c80d68c148dead49e67ff7e7ba646c0))
* load on scroll in songlist page ([3436925f](https://github.com/Clarkkkk/Netease-Music-App/commit/3436925fbea9d5035494f1aa568dd9d965ba7de5))
* mini music player ([792b1866](https://github.com/Clarkkkk/Netease-Music-App/commit/792b1866aa8805370a9e71168913e97aa6e32620))
* banner navigation ([36c3fc81](https://github.com/Clarkkkk/Netease-Music-App/commit/36c3fc81b974f479e395feb8695d323d539e925c))
* support mediaSession ([095b046e](https://github.com/Clarkkkk/Netease-Music-App/commit/095b046e12fc65af8a4919d888e04cb558eea0f5))
* navigate to songlist page via recommanded songlists ([66f700fa](https://github.com/Clarkkkk/Netease-Music-App/commit/66f700fa76c5c557e6f7c52a3543211032f803ed))
* ability to play songlist ([a644edcf](https://github.com/Clarkkkk/Netease-Music-App/commit/a644edcf8a1dd57458b29f017ffa08bca8a1cf79))
    
    ### **Description**
    
    - move personal fm to the right of navbar
    - play the song and play the song next
    
* songlist page and components ([c4b2816a](https://github.com/Clarkkkk/Netease-Music-App/commit/c4b2816af9cb1fced0cb962e8beb0758c28171a9))
* useDeviceType ([2b74bca6](https://github.com/Clarkkkk/Netease-Music-App/commit/2b74bca60eea950c1f7a5e232dcc03e2b239173b))
* SongItem component ([5cd7ab64](https://github.com/Clarkkkk/Netease-Music-App/commit/5cd7ab64108b014756cefc6c936ad5b5d657f12d))
* ContextMenu component ([fa616046](https://github.com/Clarkkkk/Netease-Music-App/commit/fa61604620284d4943b38b9424a6795ea33eed11))
* show avatar after login ([ebfcb6fb](https://github.com/Clarkkkk/Netease-Music-App/commit/ebfcb6fb69168f58847c0b0b69bb47cd11a3ffbd))
* play page adaptive design ([6fb9b9fa](https://github.com/Clarkkkk/Netease-Music-App/commit/6fb9b9fac7189753a9215a0ad68057684932ba68))
* homepage adaptive design ([25ebbf26](https://github.com/Clarkkkk/Netease-Music-App/commit/25ebbf26d4f50c4f1c4116c91681eff6048a53ea))
* add content to homepage ([958fcfe3](https://github.com/Clarkkkk/Netease-Music-App/commit/958fcfe3b943efee8d44dd119d71156592c8ae77))
* change icon style to bold ([0ff5938c](https://github.com/Clarkkkk/Netease-Music-App/commit/0ff5938cd2f2bc89fb01cd43c206aa4ca0d2c0d4))
* global scrollbar style ([68e559e9](https://github.com/Clarkkkk/Netease-Music-App/commit/68e559e92099d0dcdc402463440382fe0811f3f0))
* configure github actions for building and deploying ([03ae969a](https://github.com/Clarkkkk/Netease-Music-App/commit/03ae969a3cee7f3c1f7a83ccf31f5437bc453bd2))
* radio page ([7495f7c8](https://github.com/Clarkkkk/Netease-Music-App/commit/7495f7c8703a66f14606a2edc043db75c13335ed))
* music progress bar ([b46cb0fa](https://github.com/Clarkkkk/Netease-Music-App/commit/b46cb0fa1f3e33a423880479b5fc76be8f67c0ec))
* support history playlist in store ([71598322](https://github.com/Clarkkkk/Netease-Music-App/commit/715983221f8220f92a1a2793e84b3e6606149e89))
* usePlaylistStore and other store relative updates ([7a5fb7d7](https://github.com/Clarkkkk/Netease-Music-App/commit/7a5fb7d72e1d6ec389c937131692f695dcf137b3))
* usePlayStatusEffect and useMusicControls ([7110c676](https://github.com/Clarkkkk/Netease-Music-App/commit/7110c676f89bf0fba613561fb92d79958d727c21))
* store login user id and expires ([fa55a495](https://github.com/Clarkkkk/Netease-Music-App/commit/fa55a49549b5a57369eb41b276d1ff8ffe1f1bff))
* Audio and useAudioStore ([39ab2652](https://github.com/Clarkkkk/Netease-Music-App/commit/39ab265216362a27e570b0b7a3fcf09ee28ed9c8))
* navigation guard ([28afcf7a](https://github.com/Clarkkkk/Netease-Music-App/commit/28afcf7a8d254a02362b4c1ed45b61d690674bb0))
* RouterLink in Nav ([60b3f022](https://github.com/Clarkkkk/Netease-Music-App/commit/60b3f0229673bd53c973db23be80db5d52b4141a))
* nav and login ([5e894ef1](https://github.com/Clarkkkk/Netease-Music-App/commit/5e894ef1c3885fc4165f2414cc8ba3a0db14fbea))
    
    ### **Description**
    
    - Nav, Profile, Button, LoginModal
    - update daisyui to v3
    - move an eslint rule
    - bug fixes
    - remove useless code
    
* useProfileStore and logout api in useAuthStore ([3f9465ef](https://github.com/Clarkkkk/Netease-Music-App/commit/3f9465ef1ce5a33ace2b2e3fb940bd05b0040592))
* global nav bar ([3bcf07ec](https://github.com/Clarkkkk/Netease-Music-App/commit/3bcf07ec21f47d8271d3e5b2a2f2f6f557f13722))
* log in feature and more ([21997a51](https://github.com/Clarkkkk/Netease-Music-App/commit/21997a51720b85ebc2742e4a84382c499ca3149d))
* generate api interface with scirpts ([ecc503f9](https://github.com/Clarkkkk/Netease-Music-App/commit/ecc503f9a4d416e229d156bd0a7303ed7345fe8a))
* write some config files ([300bd1b5](https://github.com/Clarkkkk/Netease-Music-App/commit/300bd1b56d069b82ece7ecab19c8017da1dcfba3))
* Rewrite the whole program with vue 3, vite, TypeScript, pnpm, etc. ([1da0cb39](https://github.com/Clarkkkk/Netease-Music-App/commit/1da0cb39ebc968bf0333f3db8365bc778b134ede))

## **Bug Fixes**

* update pnpm version in build.yml ([4650b682](https://github.com/Clarkkkk/Netease-Music-App/commit/4650b6821e37d2ca0c0db0711b129298aacedaab))
* should show subName when it is 'null' ([0f0dc37f](https://github.com/Clarkkkk/Netease-Music-App/commit/0f0dc37fbca68522c8db56eb6b9c8c7fa53e52f8))
* fix a bug in switchToThisSong ([9ed9e6b7](https://github.com/Clarkkkk/Netease-Music-App/commit/9ed9e6b712be251fc6cda1de3e5e8b475423b3b9))
* not using async function in personal fm button ([549c75e3](https://github.com/Clarkkkk/Netease-Music-App/commit/549c75e33b0a7bd9f0f42065b1db26d9ee65f7a3))
* button icons overlap when loading ([d083bb05](https://github.com/Clarkkkk/Netease-Music-App/commit/d083bb05877b7787129e93da0a9ca516916c79f7))
* convert banner picture url to https ([3884d4d0](https://github.com/Clarkkkk/Netease-Music-App/commit/3884d4d07efd009c537ff07496201a54de81d9c7))
* timestamp not updated after url update ([7695ee5b](https://github.com/Clarkkkk/Netease-Music-App/commit/7695ee5bcaf19963212935d31ce0f569e3e7ce96))
* wrong condition in song url expiration checking ([cd762c69](https://github.com/Clarkkkk/Netease-Music-App/commit/cd762c69e4d9c0ee7e1793a4f3b50ec09dfa0497))
* vite "base" option should start with a slash ([7739a463](https://github.com/Clarkkkk/Netease-Music-App/commit/7739a4637b89c0aaf1cd3c0f3b39600908bb5d10))
* use node 16 to comply with @squoosh/lib ([55fdf5c0](https://github.com/Clarkkkk/Netease-Music-App/commit/55fdf5c0e177976e9c77eb60d6c263a701af8710))
* refetch song url when it expires ([03bdbd63](https://github.com/Clarkkkk/Netease-Music-App/commit/03bdbd63f221d0e840e89fbd64354d7eb411768e))
* fix a bug in storeLoginInfo and ensure the song url to be https ([6edcbbd4](https://github.com/Clarkkkk/Netease-Music-App/commit/6edcbbd4bd1b08e50b04be3c53bf3913ba9bd38c))
* change expire calculation ([6232d8f9](https://github.com/Clarkkkk/Netease-Music-App/commit/6232d8f9af8d9acf8a21a5ca64c4fc961941258b))
* change the default bit rate to 320k ([f3c24394](https://github.com/Clarkkkk/Netease-Music-App/commit/f3c243943ca6ced148eb119305a763a1e7e8342c))
* urls of pictures are not https ([bd69c3e4](https://github.com/Clarkkkk/Netease-Music-App/commit/bd69c3e44730815ab0a3ac4713b148914134b619))
* fix base path ([0437367c](https://github.com/Clarkkkk/Netease-Music-App/commit/0437367ccb79ad18d713c3a0346eb79af47b43d7))
* fix play relavent problems ([9af1b53d](https://github.com/Clarkkkk/Netease-Music-App/commit/9af1b53d91e005a854b1f86c7e607342b41f8153))
* before playing current song,should wait until ready ([a09cab6d](https://github.com/Clarkkkk/Netease-Music-App/commit/a09cab6d8336b21059de68081fe1ccdbfe8256c8))
* fix a bug that Image does not update when src changes ([04f558bb](https://github.com/Clarkkkk/Netease-Music-App/commit/04f558bb53f81aa4535b87ecf1cb2400a7c816ba))
* fix audio status event problems ([24a3ddeb](https://github.com/Clarkkkk/Netease-Music-App/commit/24a3ddeb44843f87a4e6f4058eaed5614afe25fa))
* fix login problems when login expires ([0ce700ed](https://github.com/Clarkkkk/Netease-Music-App/commit/0ce700ed97fd1e727a9c32baa0c94ab0235befa2))
* reload after login ([07f28259](https://github.com/Clarkkkk/Netease-Music-App/commit/07f28259cbbe54c54e700eab8115aa93924489cf))

## **Chores**

* changelog ([af01324f](https://github.com/Clarkkkk/Netease-Music-App/commit/af01324fd5cae4e4822543da98fc5f539781ff2c))
* set vite clearScreen to false ([cc8dd6da](https://github.com/Clarkkkk/Netease-Music-App/commit/cc8dd6da12934ea31dac7f9c7b1ad78fa56ac9bd))
* rename radio page to playing page and fix some problems ([6c0f1c2d](https://github.com/Clarkkkk/Netease-Music-App/commit/6c0f1c2db61359ff515224353ab4135c2e72072d))
* add container query tailwindcss plugin ([55cbbd80](https://github.com/Clarkkkk/Netease-Music-App/commit/55cbbd80c6bc1a5780092972f6a71ecef6321a17))
* tailwind custom variables ([341a9308](https://github.com/Clarkkkk/Netease-Music-App/commit/341a93087fc2d9aaa64f3a324b07e0e4345c60e4))
* eslint config ([64834721](https://github.com/Clarkkkk/Netease-Music-App/commit/648347212ab14d9c0eb376a12107c97a35fc32e8))
* use pnpm and setup cache in github actions ([77a3ce9d](https://github.com/Clarkkkk/Netease-Music-App/commit/77a3ce9ddbefc97b7745720cbe9459389e5c5945))
* update website meta and favicon ([10b8d33d](https://github.com/Clarkkkk/Netease-Music-App/commit/10b8d33de5550b2a0ed7e582bbf87982c15a81df))
* configure __VUE_OPTIONS_API__ and fix build problems ([5cfc38b1](https://github.com/Clarkkkk/Netease-Music-App/commit/5cfc38b1cfb87ea2334136d1121070f75c5a000c))
* add a prop to eliminate vue alert ([46e16887](https://github.com/Clarkkkk/Netease-Music-App/commit/46e16887d340f6229de4cc842bf6d88078598757))
* format file ([08b03939](https://github.com/Clarkkkk/Netease-Music-App/commit/08b03939e92d78110bc8be54ceb3a86b78078566))
* song api and types ([d122e665](https://github.com/Clarkkkk/Netease-Music-App/commit/d122e6654a1c9883332f2200181e862ef8727f82))
* lint config ([e7f01639](https://github.com/Clarkkkk/Netease-Music-App/commit/e7f01639fd4bfd4932c7e78f9ceac73b226f9682))
* format all the code in one go ([587d6f87](https://github.com/Clarkkkk/Netease-Music-App/commit/587d6f8734e4cf3691d2602acf6dabdaa30d8a9f))
* adjust unplugin-vue-components, turn on type checker ([36fe3601](https://github.com/Clarkkkk/Netease-Music-App/commit/36fe36012cf7f51043658bf8b9fa9cb8538c2097))
* replace prettier-eslint with eslint-plugin-prettier ([c1565bad](https://github.com/Clarkkkk/Netease-Music-App/commit/c1565bad43597cbeac9b61a9ec470e783c914f87))
* config and deps ([af829bbc](https://github.com/Clarkkkk/Netease-Music-App/commit/af829bbc6ffd3491ea179148cd1e9a537649c30c))
* fix ApiLoginStatus and complete ApiUserDetail ([95eae104](https://github.com/Clarkkkk/Netease-Music-App/commit/95eae104f0d4c9e3bf743980a05b9f49ab825ca0))
* tailwind config ([36725382](https://github.com/Clarkkkk/Netease-Music-App/commit/367253822a44a418641959f9500b8e0e40252646))
* eslint config ([4e9b1798](https://github.com/Clarkkkk/Netease-Music-App/commit/4e9b1798717be6483cfbe9e991c654d5bc646d8e))
* move components.d.ts to src/types ([14a5661e](https://github.com/Clarkkkk/Netease-Music-App/commit/14a5661e0414d27d9a9b16d402ce24753bb49fbd))
* format files in pre-commit ([5ab40273](https://github.com/Clarkkkk/Netease-Music-App/commit/5ab40273b2a8d989d47229848a5d99ff043c4d3d))
* typescript config, deps update etc ([374b7e1f](https://github.com/Clarkkkk/Netease-Music-App/commit/374b7e1f42f633854378561f4f2318dc22961fc9))



