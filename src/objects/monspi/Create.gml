/// gml_Object_monspi_Create_0
// locals: __b__
life = 1;
action_set_motion(30, random_range(4, 7));
depth = -3990;
desto = 1;
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
action_set_alarm(750, 0);
action_set_alarm(45, 5);
