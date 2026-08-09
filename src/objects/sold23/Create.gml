/// gml_Object_sold23_Create_0
// locals: __b__
with (chies) {
    __b__ = action_if_variable(level, 3, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_set(soldfade, 0, 1);
    action_set_alarm(20, 0);
}
