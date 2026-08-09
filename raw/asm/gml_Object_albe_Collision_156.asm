// gml_Object_albe_Collision_156  locals=2 args=0 len=412
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v selva
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x213D180
0000004C: push.imm.e 1
00000050: pop.v.i selva
00000058: push.imm.e 3
0000005C: conv.i.v
00000060: call action_if_dice(argc=1)
00000068: pop.v.v local.__b__
00000070: push.local.v local.__b__
00000078: conv.v.b
0000007C: bf 0x213D0E8
00000080: push.imm.e 1
00000084: conv.i.v
00000088: call action_set_relative(argc=1)
00000090: popz
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 470
000000A8: conv.i.v
000000AC: call action_create_object(argc=3)
000000B4: popz
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: call action_set_relative(argc=1)
000000C8: popz
000000CC: call action_kill_object(argc=0)
000000D4: popz
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: exit
000000F0: push.imm.e 4
000000F4: conv.i.v
000000F8: call action_if_dice(argc=1)
00000100: pop.v.v local.__b__
00000108: push.local.v local.__b__
00000110: conv.v.b
00000114: bf 0x213D180
00000118: push.imm.e 1
0000011C: conv.i.v
00000120: call action_set_relative(argc=1)
00000128: popz
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 471
00000140: conv.i.v
00000144: call action_create_object(argc=3)
0000014C: popz
00000150: push.imm.e 0
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz
00000164: call action_kill_object(argc=0)
0000016C: popz
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz
00000184: exit
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: call action_set_relative(argc=1)
00000198: popz