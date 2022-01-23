/scheduler avoid scroll second one/
node-module -> lib -> index.js -> line #460 make width 'calc(100% - 10px)'
 return _react2.default.createElement(
                'table',
                { id: 'RBS-Scheduler-root', className: 'scheduler', style: { width: 'calc(100% - 10px)'  } },

wordBreak:'break-all',whitespace:'no-wrap'

  console.log(schedulerData.getSchedulerWidth(),schedulerData.viewType);
            var width = schedulerData.getSchedulerWidth();
            if(schedulerData.viewType.toString() == "0"){
                width = schedulerData.getSchedulerWidth() - 155;
            }
            if(schedulerData.viewType.toString() == "1"){
                width = schedulerData.getSchedulerWidth() - 134;
            }
            if(schedulerData.viewType.toString() == "2"){
                width = schedulerData.getSchedulerWidth() - 154;
            }
            if(schedulerData.viewType.toString() == "4"){
                width = schedulerData.getSchedulerWidth() - 154;
            }

 // let leftCustomHeader = (
        //     <div>
        //         <span style={{ fontWeight: 'bold' }}><a onClick={this.showModal}>Add a resource</a></span>
        //         <AddResourceForm
        //             ref={this.saveFormRef}
        //             visible={this.state.visible}
        //             onCancel={this.handleCancel}
        //             onCreate={this.handleCreate}
        //             addResource={this.addResource}
        //         />
        //     </div>
        // );

events: Array(14)
0:
bgColor: "#D9D9D9"
end: "2017-12-19 23:30:00"
id: 1
resourceId: "r1"
showPopover: false
start: "2017-12-18 09:30:00"
title: "I am finished"
__proto__: Object
1: {id: 2, start: "2017-12-18 12:30:00", end: "2017-12-26 23:30:00", resourceId: "r2", title: "I am not resizable", …}
2: {id: 3, start: "2017-12-19 12:30:00", end: "2017-12-20 23:30:00", resourceId: "r3", title: "I am not movable", …}
3: {id: 4, start: "2017-12-19 14:30:00", end: "2017-12-20 23:30:00", resourceId: "r4", title: "I am not start-resizable", …}
4: {id: 5, start: "2017-12-19 15:30:00", end: "2017-12-20 23:30:00", resourceId: "r5", title: "I am not end-resizable", …}
5: {id: 6, start: "2017-12-19 15:35:00", end: "2017-12-19 23:30:00", resourceId: "r6", title: "I am normal"}
6: {id: 7, start: "2017-12-19 15:40:00", end: "2017-12-20 23:30:00", resourceId: "r7", title: "I am exceptional", …}
7: {id: 8, start: "2017-12-19 15:50:00", end: "2017-12-19 23:30:00", resourceId: "r1", title: "I am locked", …}
8: {id: 9, start: "2017-12-19 16:30:00", end: "2017-12-27 23:30:00", resourceId: "r1", title: "R1 has many tasks 1"}
9: {id: 10, start: "2017-12-19 17:30:00", end: "2017-12-19 23:30:00", resourceId: "r1", title: "R1 has recurring tasks every week on Tuesday, Friday", …}
10: {id: 11, start: "2017-12-19 18:30:00", end: "2017-12-20 23:30:00", resourceId: "r1", title: "R1 has many tasks 3"}
11: {id: 12, start: "2017-12-20 18:30:00", end: "2017-12-20 23:30:00", resourceId: "r1", title: "R1 has many tasks 4"}
12: {id: 13, start: "2017-12-21 18:30:00", end: "2017-12-24 23:30:00", resourceId: "r1", title: "R1 has many tasks 5"}
13: {id: 14, start: "2017-12-23 18:30:00", end: "2017-12-27 23:30:00", resourceId: "r1", title: "R1 has many tasks 6"}
length: 14
__proto__: Array(0)
eventsForCustomEventStyle: Array(12)
0:
bgColor: "#D9D9D9"
end: "2017-12-19 23:30:00"
id: 1
resourceId: "r1"
start: "2017-12-18 09:30:00"
title: "I am finished"
type: 1
__proto__: Object
1: {id: 2, start: "2017-12-18 12:30:00", end: "2017-12-26 23:30:00", resourceId: "r2", title: "I am not resizable", …}
2: {id: 3, start: "2017-12-19 12:30:00", end: "2017-12-20 23:30:00", resourceId: "r3", title: "I am not movable", …}
3: {id: 4, start: "2017-12-19 14:30:00", end: "2017-12-20 23:30:00", resourceId: "r4", title: "I am not start-resizable", …}
4: {id: 5, start: "2017-12-19 15:30:00", end: "2017-12-20 23:30:00", resourceId: "r5", title: "I am not end-resizable", …}
5: {id: 6, start: "2017-12-19 15:35:00", end: "2017-12-19 23:30:00", resourceId: "r6", title: "I am normal", …}
6: {id: 7, start: "2017-12-19 15:40:00", end: "2017-12-20 23:30:00", resourceId: "r7", title: "I am exceptional", …}
7: {id: 8, start: "2017-12-19 15:50:00", end: "2017-12-19 23:30:00", resourceId: "r1", title: "I am locked", …}
8: {id: 9, start: "2017-12-19 16:30:00", end: "2017-12-27 23:30:00", resourceId: "r1", title: "R1 has many tasks 1", …}
9: {id: 10, start: "2017-12-20 18:30:00", end: "2017-12-20 23:30:00", resourceId: "r1", title: "R1 has many tasks 2", …}
10: {id: 11, start: "2017-12-21 18:30:00", end: "2017-12-22 23:30:00", resourceId: "r1", title: "R1 has many tasks 3", …}
11: {id: 12, start: "2017-12-23 18:30:00", end: "2017-12-27 23:30:00", resourceId: "r1", title: "R1 has many tasks 4", …}
length: 12
__proto__: Array(0)
eventsForTaskView: Array(12)
0:
bgColor: "#D9D9D9"
end: "2017-12-18 23:30:00"
groupId: 1
groupName: "Task1"
id: 1
resourceId: "r1"
start: "2017-12-18 09:30:00"
title: "I am finished"
__proto__: Object
1: {id: 2, start: "2017-12-18 12:30:00", end: "2017-12-26 23:30:00", resourceId: "r2", title: "I am not resizable", …}
2: {id: 3, start: "2017-12-19 12:30:00", end: "2017-12-20 23:30:00", resourceId: "r3", title: "I am not movable", …}
3: {id: 7, start: "2017-12-19 15:40:00", end: "2017-12-20 23:30:00", resourceId: "r7", title: "I am exceptional", …}
4: {id: 4, start: "2017-12-20 14:30:00", end: "2017-12-21 23:30:00", resourceId: "r4", title: "I am not start-resizable", …}
5: {id: 5, start: "2017-12-21 15:30:00", end: "2017-12-22 23:30:00", resourceId: "r5", title: "I am not end-resizable", …}
6: {id: 9, start: "2017-12-21 16:30:00", end: "2017-12-21 23:30:00", resourceId: "r1", title: "R1 has many tasks", …}
7: {id: 6, start: "2017-12-22 15:35:00", end: "2017-12-23 23:30:00", resourceId: "r6", title: "I am normal", …}
8: {id: 8, start: "2017-12-25 15:50:00", end: "2017-12-26 23:30:00", resourceId: "r1", title: "I am locked", …}
9: {id: 10, start: "2017-12-26 18:30:00", end: "2017-12-26 23:30:00", resourceId: "r2", title: "R2 has many tasks", …}
10: {id: 11, start: "2017-12-27 18:30:00", end: "2017-12-27 23:30:00", resourceId: "r14", title: "R4 has many tasks", …}
11: {id: 12, start: "2017-12-28 18:30:00", end: "2017-12-28 23:30:00", resourceId: "r6", title: "R6 has many tasks", …}
length: 12
__proto__: Array(0)
resources: Array(8)
0: {id: "r0", name: "Resource0", groupOnly: true}
1: {id: "r1", name: "Resource1", parentId: "r0"}
2: {id: "r2", name: "Resource2", parentId: "r3"}
3: {id: "r3", name: "Resource3", parentId: "r1"}
4: {id: "r4", name: "Resource4"}
5: {id: "r5", name: "Resource5"}
6: {id: "r6", name: "Resource6"}
7: {id: "r7", name: "Resource7Resource7Resource7Resource7Resource7"}a