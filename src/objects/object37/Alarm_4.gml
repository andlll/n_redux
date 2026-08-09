/// gml_Object_object37_Alarm_4
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_alarm(80, 0);
    } else {
        action_set_alarm(109, 0);
    }
} else {
    action_set_alarm(74, 0);
}
