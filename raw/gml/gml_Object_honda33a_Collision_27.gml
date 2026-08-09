/// gml_Object_honda33a_Collision_27
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda1, 605, 835);
}
action_kill_object();
