/// gml_Object_honda8_Alarm_11
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda8, 253, 403);
}
action_kill_object();
