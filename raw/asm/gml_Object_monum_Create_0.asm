// gml_Object_monum_Create_0  locals=2 args=0 len=560
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 296
00000028: conv.i.v
0000002C: call action_create_object(argc=3)
00000034: popz
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: call action_set_relative(argc=1)
00000048: popz
0000004C: push.imm.e 1000
00000050: pop.v.i life
00000058: push.imm.e 1
0000005C: conv.i.v
00000060: call action_set_relative(argc=1)
00000068: popz
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: call action_set_relative(argc=1)
0000007C: popz
00000080: push.imm.e 0
00000084: pop.v.i redder
0000008C: push.imm.e 1
00000090: conv.i.v
00000094: call action_set_relative(argc=1)
0000009C: popz
000000A0: push.imm.e 156
000000A4: pushenv 0x20D4E4C
000000A8: push.v hap
000000B0: push.imm.e 1000
000000B4: add.i.v
000000B8: pop.v.v hap
000000C0: popenv 0x40D4E34
000000C4: push.imm.e 455
000000C8: pushenv 0x20D4E94
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 1
000000D8: conv.i.v
000000DC: push.v night
000000E4: call action_if_variable(argc=3)
000000EC: pop.v.v local.__b__
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x20D4E94
00000104: b 0x20D4E9C
00000108: popenv 0x40D4E58
0000010C: b 0x20D4EA0
00000110: popenv 0x1CD4E9C
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x20D4ED0
00000124: push.imm.e 1
00000128: conv.i.v
0000012C: push.i 16366009
00000134: conv.i.v
00000138: call action_sprite_color(argc=2)
00000140: popz
00000144: push.imm.e 455
00000148: pushenv 0x20D4F14
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: push.imm.e 1
00000158: conv.i.v
0000015C: push.v dawn
00000164: call action_if_variable(argc=3)
0000016C: pop.v.v local.__b__
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x20D4F14
00000184: b 0x20D4F1C
00000188: popenv 0x40D4ED8
0000018C: b 0x20D4F20
00000190: popenv 0x1CD4F1C
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x20D4F50
000001A4: push.imm.e 1
000001A8: conv.i.v
000001AC: push.i 15201023
000001B4: conv.i.v
000001B8: call action_sprite_color(argc=2)
000001C0: popz
000001C4: push.v y
000001CC: neg.v.d
000001D0: pop.v.v depth
000001D8: push.imm.e 0
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.imm.e 0
000001F0: conv.i.v
000001F4: push.imm.e 67
000001F8: conv.i.v
000001FC: call action_set_alarm(argc=2)
00000204: popz
00000208: push.imm.e 1
0000020C: conv.i.v
00000210: call action_set_relative(argc=1)
00000218: popz
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: call action_set_relative(argc=1)
0000022C: popz