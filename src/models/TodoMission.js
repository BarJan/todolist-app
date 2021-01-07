class TodoMission{

    constructor(todoMissionOrText, isComplete){
        
        if(typeof todoMissionOrText === "object"){
            this.text = todoMissionOrText.text;
            this.isComplete = todoMissionOrText.isComplete;
        }
        else{
            this.text = todoMissionOrText;
            this.isComplete = isComplete;
        }
    }

}

export default TodoMission;