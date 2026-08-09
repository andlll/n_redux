// gml_Object_chies_Create_0  locals=2 args=0 len=576
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 336
00000028: conv.i.v
0000002C: call action_create_object(argc=3)
00000034: popz
00000038: push.imm.e -400
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 155
0000004C: conv.i.v
00000050: call action_create_object(argc=3)
00000058: popz
0000005C: push.v y
00000064: neg.v.d
00000068: pop.v.v depth
00000070: push.imm.e 0
00000074: conv.i.v
00000078: call action_set_relative(argc=1)
00000080: popz
00000084: push.imm.e 0
00000088: pop.v.i trade
00000090: push.imm.e 1
00000094: conv.i.v
00000098: call action_set_relative(argc=1)
000000A0: popz
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: call action_set_relative(argc=1)
000000B4: popz
000000B8: push.imm.e 1
000000BC: pop.v.i level
000000C4: push.imm.e 1
000000C8: conv.i.v
000000CC: call action_set_relative(argc=1)
000000D4: popz
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: push.imm.e 0
000000F0: pop.v.i updue
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: call action_set_relative(argc=1)
00000108: popz
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: call action_set_relative(argc=1)
0000011C: popz
00000120: push.imm.e 0
00000124: pop.v.i uptre
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: call action_set_relative(argc=1)
0000013C: popz
00000140: push.imm.e 0
00000144: conv.i.v
00000148: call action_set_relative(argc=1)
00000150: popz
00000154: push.imm.e 0
00000158: pop.v.i uppingdue
00000160: push.imm.e 1
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: call action_set_relative(argc=1)
00000184: popz
00000188: push.imm.e 1000
0000018C: pop.v.i life
00000194: push.imm.e 1
00000198: conv.i.v
0000019C: call action_set_relative(argc=1)
000001A4: popz
000001A8: push.imm.e 0
000001AC: conv.i.v
000001B0: call action_set_relative(argc=1)
000001B8: popz
000001BC: push.imm.e 0
000001C0: pop.v.i distrutta
000001C8: push.imm.e 1
000001CC: conv.i.v
000001D0: call action_set_relative(argc=1)
000001D8: popz
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 736
000001F0: conv.i.v
000001F4: call action_if_number(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x20C3430
00000214: push.imm.e 458
00000218: pushenv 0x20C342C
0000021C: call action_kill_object(argc=0)
00000224: popz
00000228: popenv 0x40C3420
0000022C: push.imm.e 0
00000230: conv.i.v
00000234: call action_set_relative(argc=1)
0000023C: popz