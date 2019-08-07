({
    init: function (component) {
        var columns = [
            {
                type: 'url',
                fieldName: 'recordurl',
                label: 'Name',
                initialWidth: 250,
                typeAttributes: {
                    label: { fieldName: 'recordName' }
                }
            },
            {
                type: 'text',
                fieldName: 'casesubject',
                label: 'Subject'
            },
            {
                type: 'text',
                fieldName: 'casestatus',
                label: 'Status'
            }
        ];

        
        component.set('v.gridColumns', columns);

        var recId = component.get("v.recordId");
        var action = component.get('c.getAllCases');
        
        action.setParams({
            "recordId":recId
        });
        action.setCallback(this, function(response)
        {
            var state = response.getState();
            if(state === 'SUCCESS')
            {
                var datareturned = response.getReturnValue();
                var jsonstring = JSON.stringify(datareturned).split('treeItems').join('_children');
                console.log(jsonstring);

                component.set('v.gridData',JSON.parse(jsonstring));
                
                var tree = component.find('casetree');
                tree.expandAll();

            }else{
                
                var errors = response.getError();
                if (errors) 
                {
                    if (errors[0] && errors[0].message) 
                    {
                        console.log("Error message: " + errors[0].message);
                        component.set('v.errorMSG',errors[0].message);
                    }
                    else
                    {
                        console.log("Unknown error");
                        component.set('v.errorMSG',"Unknown error");
                    }
                } 
                else {
                    console.log("Unknown error");
                    component.set('v.errorMSG',"Unknown error");
                }

            }
        });
        
        $A.enqueueAction(action);

        var tree = component.find('casetree');
        tree.expandAll();
        
    }
})
