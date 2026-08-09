/// gml_Object_honda32y_Alarm_6
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda32y, 2713, 565);
}
action_kill_object();
