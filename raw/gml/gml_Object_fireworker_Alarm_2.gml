/// gml_Object_fireworker_Alarm_2
// locals: __b__
action_set_relative(1);
__b__ = action_if_number(644, 0, 2);
if (__b__) {
    __b__ = action_if_number(8, 0, 0);
    if (__b__) {
        with (repre) {
            __b__ = action_if_variable(mon, 1, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_effect(3, -10, -40, 1, 255, 0);
        }
    }
}
action_set_relative(0);
action_set_alarm(60, 2);
action_set_relative(1);
action_set_relative(0);
