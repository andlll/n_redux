/// gml_Object_fujilogo_Alarm_0
// locals: __b__
__b__ = action_if_variable(going, 0, 0);
if (__b__) {
    action_set_alarm(30, 1);
    action_create_object(disba, 0, 0);
    going = 1;
}
