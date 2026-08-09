// gml_Object_yellow_pro_Collision_78  locals=2 args=0 len=180
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v other.id
0000001C: conv.v.i
00000020: pushenv 0x20C2170
00000024: push.v life
0000002C: push.d -0.07
00000038: add.d.v
0000003C: pop.v.v life
00000044: popenv 0x40C2150
00000048: push.v other.id
00000050: conv.v.i
00000054: pushenv 0x20C21AC
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.v desto
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: popenv 0x40C2184
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20C21CC
00000094: call action_kill_object(argc=0)
0000009C: popz
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: call action_set_relative(argc=1)
000000B0: popz