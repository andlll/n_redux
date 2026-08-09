/// gml_Object_honda4_Alarm_3
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda4, 72, 528);
}
action_kill_object();
