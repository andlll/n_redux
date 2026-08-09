// gml_Object_bomba1_Collision_192  locals=2 args=0 len=140
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v arm
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B4C2C
0000004C: push.v other.id
00000054: conv.v.i
00000058: pushenv 0x20B4C28
0000005C: push.v life
00000064: push.imm.e -100
00000068: add.i.v
0000006C: pop.v.v life
00000074: popenv 0x40B4C10
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: call action_set_relative(argc=1)
00000088: popz