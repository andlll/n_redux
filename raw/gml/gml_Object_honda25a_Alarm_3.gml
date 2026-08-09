/// gml_Object_honda25a_Alarm_3
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda25a, 135, 1222);
}
action_kill_object();
