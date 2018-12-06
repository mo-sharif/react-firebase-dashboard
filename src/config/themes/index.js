const themes = [
  {
    id: 'dark',
    color: 'black',
    source: {
      palette: {
        primary: {
          main: '#424242',
          borderColor:'#ff5722',
        },
        secondary: {
          main: '#424242',
        },
        error: {
          main: '#e91e63',
        },
      }
    }
  },
  {
    id: 'light',
    color: '#eaeaea',
    source: {
      palette:{
        primary:{
          main: '#ffffff',
          dark: '#f7f7f7',
        },
        secondary:{
          main: '#afaeae',
        },
        error: {
          main: '#e91e63',
        },
      }
    }
  },
  {
    id: 'sky',
    color: '#35baf6',
    source: {
      palette: {
        primary: {
          main: '#35baf6',
          dark: '#35baf6',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#03a9f4',
        },
        error: {
          main: '#e91e63',
        }
      }
    }
  },
  {
    id: 'fire',
    color: '#ff5722',
    source: {
      palette: {
        primary: {
          main: '#ff5722',
          dark: '#ff5722',
        },
        secondary: {
          main: '#ff5722',
        },
        error: {
          main: '#e91e63',
        },
      }
    }
  }
]

export default themes
