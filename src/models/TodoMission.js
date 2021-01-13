import uuid from 'react-uuid'

class TodoMission{

    constructor(todoMissionOrText, isComplete){
        
        if(typeof todoMissionOrText === "object"){
            this.id = uuid();
            this.text = todoMissionOrText.text;
            this.isComplete = todoMissionOrText.isComplete;
        }
        else{
            this.id = uuid();
            this.text = todoMissionOrText;
            this.isComplete = isComplete;
        }
    }

}

export default TodoMission;