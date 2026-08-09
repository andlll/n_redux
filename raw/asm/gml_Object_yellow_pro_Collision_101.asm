// gml_Object_yellow_pro_Collision_101  locals=2 args=0 len=324
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v other.id
0000001C: conv.v.i
00000020: pushenv 0x20C17E0
00000024: push.v life
0000002C: push.d -0.1
00000038: add.d.v
0000003C: pop.v.v life
00000044: popenv 0x40C17C0
00000048: push.v other.id
00000050: conv.v.i
00000054: pushenv 0x20C181C
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.v desto
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: popenv 0x40C17F4
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20C183C
00000094: call action_kill_object(argc=0)
0000009C: popz
000000A0: push.v other.id
000000A8: conv.v.i
000000AC: pushenv 0x20C1874
000000B0: push.imm.e 3
000000B4: conv.i.v
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.v life
000000C8: call action_if_variable(argc=3)
000000D0: pop.v.v local.__b__
000000D8: popenv 0x40C184C
000000DC: push.local.v local.__b__
000000E4: conv.v.b
000000E8: bf 0x20C18CC
000000EC: push.imm.e 0
000000F0: conv.i.v
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.imm.e 606
00000100: conv.i.v
00000104: call action_create_object(argc=3)
0000010C: popz
00000110: push.v other.id
00000118: conv.v.i
0000011C: pushenv 0x20C18C8
00000120: call action_kill_object(argc=0)
00000128: popz
0000012C: popenv 0x40C18BC
00000130: push.imm.e 0
00000134: conv.i.v
00000138: call action_set_relative(argc=1)
00000140: popz