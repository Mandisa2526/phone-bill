describe('the bill with settings factory function' , function(){
    describe('set values' , function(){
        it('should be able to set the call cost' , function(){
            let settingsBill = BillWithSettings();

            settingsBill.setCriticalLevel(10);
            settingsBill.setCallCost(1.85);
    
            assert.equal(1.85, settingsBill.getCallCost());
    
            let settingsBill2 = BillWithSettings();
            settingsBill2.setCallCost(2.75);
            
            assert.equal(2.75, settingsBill2.getCallCost());
        });
        it('should be able to set the sms cost' , function(){
            let settingsBill = BillWithSettings();
            settingsBill.setSmsCost(0.85);
            
    
            assert.equal(0.85, settingsBill.getSmsCost());
    
            let settingsBill2 = BillWithSettings();
            settingsBill2.setSmsCost(0.75);
            
            assert.equal(0.75, settingsBill2.getSmsCost());
        });
        it('should be able to set the sms and call cost' , function(){
            let settingsBill = BillWithSettings();
    
            settingsBill.setCallCost(2.75);
            settingsBill.setSmsCost(0.85);
            
    
            assert.equal(0.85, settingsBill.getSmsCost());
            
            assert.equal(2.75, settingsBill.getCallCost());
    
            let settingsBill2 = BillWithSettings();
    
            settingsBill2.setCallCost(2.75);
            settingsBill2.setSmsCost(0.85);
    
            assert.equal(0.85, settingsBill2.getSmsCost());
            
            assert.equal(2.75, settingsBill2.getCallCost());
    
        });
        it('should be able to set the warning level' , function(){
            let settingsBill = BillWithSettings();
    
            settingsBill.setWarningLevel(20);
            
    
            assert.equal(20, settingsBill.getWarningLevel());
            
        });
        it('should be able to set the critical level' , function(){
            let settingsBill = BillWithSettings();
    
            settingsBill.setCriticalLevel(30);
            
    
            assert.equal(30, settingsBill.getCriticalLevel());
            
        });
        it('should be able to set the warning & critical level' , function(){
            let settingsBill = BillWithSettings();
    
            settingsBill.setWarningLevel(15);
            settingsBill.setCriticalLevel(25);
            
    
            assert.equal(25, settingsBill.getCriticalLevel());
            assert.equal(15, settingsBill.getWarningLevel());
            
        });
    
    });
    describe('use values ' , function(){
        it('should be able to use the call cost set' , function(){
           
            let settingsBill = BillWithSettings();
            settingsBill.setCriticalLevel(10);

            settingsBill.setCallCost(2.25);
            settingsBill.setSmsCost(0.85);

            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
    
            assert.equal(6.75, settingsBill.getTotalCost());
            assert.equal(6.75, settingsBill.getTotalCallCost());
            assert.equal(0.00, settingsBill.getTotalSmsCost());
        });
        it('should be able to use the call cost set for 2 calls at 1.35 each' , function(){
           
            let settingsBill = BillWithSettings();
            settingsBill.setCriticalLevel(10);

            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);

            settingsBill.makeCall();
            settingsBill.makeCall();
            
    
            assert.equal(2.70, settingsBill.getTotalCost());
            assert.equal(2.70, settingsBill.getTotalCallCost());
            assert.equal(0.00, settingsBill.getTotalSmsCost());
        });
        it("should be able to send 2 sms's at 0.85 each" , function(){
           
            let settingsBill = BillWithSettings();
            settingsBill.setCriticalLevel(10);

            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);

            settingsBill.sendSms();
            settingsBill.sendSms();
            
    
            assert.equal(1.70, settingsBill.getTotalCost());
            assert.equal(0.00, settingsBill.getTotalCallCost());
            assert.equal(1.70, settingsBill.getTotalSmsCost());
        });
        it("should be able to send 2 sms's at 0.85 each & make 1 call" , function(){
           
            let settingsBill = BillWithSettings();

            settingsBill.setCriticalLevel(10);
            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);

            settingsBill.sendSms();
            settingsBill.sendSms();
            settingsBill.makeCall();
        
            assert.equal(3.05, settingsBill.getTotalCost());
            assert.equal(1.35, settingsBill.getTotalCallCost());
            assert.equal(1.70, settingsBill.getTotalSmsCost());
        });
        describe('warning & critical level' , function(){
            it('should be able to return a class name if warning level is reached' , function(){
               let settingsBill = BillWithSettings();
                
               settingsBill.setCallCost(1.35);
               settingsBill.setSmsCost(0.85);
               settingsBill.setWarningLevel(5);
               settingsBill.setCriticalLevel(10);

               settingsBill.makeCall();
               settingsBill.makeCall();
               settingsBill.makeCall();
               settingsBill.makeCall();

                assert.equal("warning",settingsBill.totalClassName());
            });
            it("should be able to return a class name of 'critical' if critical level is reached" , function(){
                let settingsBill = BillWithSettings();
                 
                settingsBill.setCallCost(2.50);
                settingsBill.setSmsCost(0.85);
                settingsBill.setWarningLevel(10);
                settingsBill.setCriticalLevel(10);
 
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
 
                 assert.equal("danger",settingsBill.totalClassName());
             });
             it("should be able to stop the total call cost form increasing when the critical level is reached" , function(){
                let settingsBill = BillWithSettings();
                 
                settingsBill.setCallCost(2.50);
                settingsBill.setSmsCost(0.85);
                settingsBill.setWarningLevel(8);
                settingsBill.setCriticalLevel(10);
 
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
 
                assert.equal("danger",settingsBill.totalClassName());
                assert.equal(10,settingsBill.getTotalCallCost());

                settingsBill.setCriticalLevel(20);

                assert.equal("warning",settingsBill.totalClassName());
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.equal(15,settingsBill.getTotalCallCost());

             });
             it("should allow the total to increase after reaching the critical level & then upping the critical level" , function(){
                let settingsBill = BillWithSettings();
                 
                settingsBill.setCallCost(2.50);
                settingsBill.setSmsCost(0.85);
                settingsBill.setWarningLevel(8);
                settingsBill.setCriticalLevel(10);
 
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();
 
                assert.equal("danger",settingsBill.totalClassName());
                assert.equal(10,settingsBill.getTotalCallCost());

                settingsBill.setCriticalLevel(20);

                assert.equal("warning",settingsBill.totalClassName());
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.equal(15,settingsBill.getTotalCallCost());

             });
             
        })
    
    
    });
    

});