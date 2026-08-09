/// gml_Object_dirig_Create_0
// locals: __b__
piro = 0;
life = 10;
action_set_motion(30, 2);
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
action_set_alarm(30, 0);
action_set_alarm(10000, 1);
action_set_alarm(74, 5);
