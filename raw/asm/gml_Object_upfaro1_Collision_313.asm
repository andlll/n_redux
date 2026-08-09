// gml_Object_upfaro1_Collision_313  locals=2 args=0 len=88
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v arm
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20B7DD4
00000038: push.v other.id
00000040: conv.v.i
00000044: pushenv 0x20B7DD0
00000048: call action_kill_object(argc=0)
00000050: popz
00000054: popenv 0x40B7DC4