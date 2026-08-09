/// gml_Object_nifast_Create_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_dice(2);
if (__b__) {
    action_kill_object();
}
action_set_alarm(1200, 0);
depth = -3990;
depth = 20;
action_sprite_set(n2, 0, 1);
action_set_motion(30, irandom_range(-8, -14));
action_set_relative(1);
action_move_to(irandom_range(100, 300), irandom_range(-100, 100));
action_set_relative(0);
__b__ = action_if_dice(2);
if (__b__) {
    action_sprite_set(n3, 0, 1);
}
action_set_relative(0);
