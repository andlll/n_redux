/// gml_Object_lasergun_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
depth = -y;
launching = 0;
ovr = 0;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 90;
    action_set_relative(0);
}
life = 1000;
islas = 0;
direttorio = 0;
action_set_alarm(23, 5);
action_set_relative(0);
