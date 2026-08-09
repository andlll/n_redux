/// gml_Object_honda5_Alarm_11
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda5, 1547, 517);
}
action_kill_object();
