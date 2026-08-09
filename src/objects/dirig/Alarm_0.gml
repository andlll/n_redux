/// gml_Object_dirig_Alarm_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(piro, 0, 0);
if (__b__) {
    __b__ = action_if_number(617, 0, 2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_create_object(bomba1, -20, -5);
        }
    }
    __b__ = action_if_number(617, 0, 2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_create_object(bomba1, 20, 5);
        }
    }
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
}
action_set_relative(0);
