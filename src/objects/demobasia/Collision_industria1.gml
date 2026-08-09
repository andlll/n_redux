/// gml_Object_demobasia_Collision_201
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(iessa, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 5000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (other.id) {
            deming = 1;
        }
        with (r12) {
            action_set_relative(1);
            mon = mon + -5000;
            action_set_relative(0);
        }
        action_set_relative(1);
        action_create_object(impaindu1r, 0, 0);
        action_set_relative(0);
        with (demobachia) {
            action_kill_object();
        }
        with (demoiessa) {
            action_kill_object();
        }
        with (disegnaprezzo) {
            action_kill_object();
        }
        action_kill_object();
    }
}
action_set_relative(0);
