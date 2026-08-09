// gml_Object_laserone_Collision_78  locals=2 args=0 len=300
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v nocivo
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x210EFF0
0000004C: push.v other.id
00000054: conv.v.i
00000058: pushenv 0x210EF80
0000005C: push.v life
00000064: push.imm.e -3
00000068: add.i.v
0000006C: pop.v.v life
00000074: popenv 0x410EF68
00000078: push.v other.id
00000080: conv.v.i
00000084: pushenv 0x210EFB8
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 606
0000009C: conv.i.v
000000A0: call action_create_object(argc=3)
000000A8: popz
000000AC: popenv 0x410EF94
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: call action_set_relative(argc=1)
000000C0: popz
000000C4: push.imm.e 0
000000C8: pop.v.i nocivo
000000D0: push.imm.e 1
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: call action_set_relative(argc=1)
000000F4: popz
000000F8: push.imm.e 1
000000FC: pop.v.i dat
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: call action_set_relative(argc=1)
00000114: popz
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: call action_set_relative(argc=1)
00000128: popz