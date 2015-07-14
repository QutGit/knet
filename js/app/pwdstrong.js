var PasswordStrength ={
    Level : ["强","中","弱"],
    LevelValue : [30,20,0],//强度值
    Factor : [1,2,5],//字符加数,分别为字母，数字，其它
    KindFactor : [0,0,10,20],//密码含几种组成的加数 
    Regex : [/[a-zA-Z]/g,/\d/g,/[^a-zA-Z0-9]/g] //字符正则数字正则其它正则
}
PasswordStrength.StrengthValue = function(pwd){
    var strengthValue = 0;
    var ComposedKind = 0;
    for(var i = 0 ; i < this.Regex.length;i++){
        var chars = pwd.match(this.Regex[i]);
        if(chars != null){
            strengthValue += chars.length * this.Factor[i];
            ComposedKind ++;
        }
    }
    strengthValue += this.KindFactor[ComposedKind];
    return strengthValue;
} 
PasswordStrength.StrengthLevel = function(pwd){
    var value = this.StrengthValue(pwd);
    for(var i = 0 ; i < this.LevelValue.length ; i ++){
        if(value >= this.LevelValue[i] )
            return this.Level[i];
    }
}