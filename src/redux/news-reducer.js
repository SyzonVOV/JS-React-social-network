const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let news1 = 'A leopard strayed from a nearby forest into a village in eastern India’s West Bengal state, creating chaos and panic amongst villagers. A video, that a witness took, shows a man trying to scare the animal away with a stick.';
let news2 = 'There is an app for Muslims. People launch it in 2016. It finds mosques and centres to pray. It is for Muslim travellers. The co-founder says that it ‘puts Islam in your pocket’.';
let news3 = 'Beirut is the capital city of Lebanon. On Tuesday, a big explosion happens in Beirut. The explosion happens in the port. At first, nobody knows what makes the explosion. Some media say that a fireworks warehouse explodes.';
let news4 = 'Scientists have some new information. They say that there is a ninth planet in our solar system. The planet is 10 times bigger than Earth. It is 20 times farther away from the sun than Earth.';
let news5 = 'The brothers want to run away. Police kill one of them. However, the second man runs away. The police find him four days later. The man goes to prison. In 2018, a court sentences the man to death.';
let news6 = 'Titanosaurs lived 100 million years ago. They lived in Argentina. They ate plants. They were 70 tonnes heavy. That is like ten elephants. People find a titanosaur. They move it to New York. The dinosaur goes into a museum.';

let initialState =  {
    news: [
      {id: 1, title: 'Leopard in a Village in India', news: news1, likes: 5},
      {id: 2, title: 'App for Muslims', news: news2, likes: 5},
      {id: 3, title: 'Beirut Explosion', news: news3, likes: 5},
      {id: 6, title: 'Planet Nine', news: news4, likes: 5},
      {id: 7, title: 'Boston Marathon Bomber', news: news5, likes: 5},
      {id: 8, title: 'Titanosaur in New York', news: news6, likes: 5},
    ],

      newMessageBody: "",
  };

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      break;

    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = '';
      state.messages.push({id: 6, message: body});
      break;

    default:
      console.log(`Sorry, we are out of ${action.type}.`);
  }

  return state;
};

 const sendMessageCreator = () => ({ type: SEND_MESSAGE, });

 const updateNewMessageBodyCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text,
  }
};

export default newsReducer;