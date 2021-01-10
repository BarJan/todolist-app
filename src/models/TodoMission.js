import uuid from 'react-uuid'

class TodoMission{

    constructor(todoMissionOrText, id= uuid(), isComplete){
        
        if(typeof todoMissionOrText === "object"){
            this.id = id;
            this.text = todoMissionOrText.text;
            this.isComplete = todoMissionOrText.isComplete;
        }
        else{
            this.id = id;
            this.text = todoMissionOrText;
            this.isComplete = isComplete;
        }
    }

}

export default TodoMission;