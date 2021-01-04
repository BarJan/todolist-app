class TodoMission{

    constructor(todoMissionOrText, status){
        
        if(typeof todoMissionOrText === "object"){
            this.text = todoMissionOrText.text;
            this.isComplete = todoMissionOrText.isComplete;
        }
        else{
            this.text = todoMissionOrText;
            this.isComplete = status;
        }
    }

}

export default TodoMission;