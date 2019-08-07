({
    myAction : function(component, event, helper) {
        var action = component.get("c.getContacts");
        component.set("v.Columns", [
            {label:"Name", fieldName:"Name", type:"text"},
            {label:"Phone", fieldName:"Phone", type:"phone"},
            {label:"Mobile", fieldName:"MobilePhone", type:"phone"},
            {label:"Other", fieldName:"OtherPhone", type:"phone"}
        ]);
        
        action.setParams({
            accountId: component.get("v.recordId")
        });
        action.setCallback(this, function(data) {
            component.set("v.Contacts", data.getReturnValue());
        });
        $A.enqueueAction(action);
    }

})

