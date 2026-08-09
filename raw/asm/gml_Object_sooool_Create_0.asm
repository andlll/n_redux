// gml_Object_sooool_Create_0  locals=2 args=0 len=672
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 0
00000024: pop.v.i overpark
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: call action_set_relative(argc=1)
0000003C: popz
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 236
00000054: conv.i.v
00000058: call action_create_object(argc=3)
00000060: popz
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: call action_set_relative(argc=1)
00000074: popz
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: call action_set_relative(argc=1)
00000088: popz
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 204
000000A0: conv.i.v
000000A4: call action_create_object(argc=3)
000000AC: popz
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: call action_set_relative(argc=1)
000000C0: popz
000000C4: push.imm.e 455
000000C8: pushenv 0x20EA208
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 1
000000D8: conv.i.v
000000DC: push.v night
000000E4: call action_if_variable(argc=3)
000000EC: pop.v.v local.__b__
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x20EA208
00000104: b 0x20EA210
00000108: popenv 0x40EA1CC
0000010C: b 0x20EA214
00000110: popenv 0x1CEA210
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x20EA244
00000124: push.imm.e 1
00000128: conv.i.v
0000012C: push.i 16366009
00000134: conv.i.v
00000138: call action_sprite_color(argc=2)
00000140: popz
00000144: push.imm.e 455
00000148: pushenv 0x20EA288
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: push.imm.e 1
00000158: conv.i.v
0000015C: push.v dawn
00000164: call action_if_variable(argc=3)
0000016C: pop.v.v local.__b__
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x20EA288
00000184: b 0x20EA290
00000188: popenv 0x40EA24C
0000018C: b 0x20EA294
00000190: popenv 0x1CEA290
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x20EA2C4
000001A4: push.imm.e 1
000001A8: conv.i.v
000001AC: push.i 15201023
000001B4: conv.i.v
000001B8: call action_sprite_color(argc=2)
000001C0: popz
000001C4: push.imm.e 156
000001C8: pushenv 0x20EA30C
000001CC: push.imm.e 1
000001D0: conv.i.v
000001D4: call action_set_relative(argc=1)
000001DC: popz
000001E0: push.v wewe
000001E8: push.imm.e 10
000001EC: add.i.v
000001F0: pop.v.v wewe
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: call action_set_relative(argc=1)
00000208: popz
0000020C: popenv 0x40EA2CC
00000210: push.imm.e 0
00000214: pop.v.i deming
0000021C: push.imm.e 0
00000220: pop.v.i arp
00000228: push.imm.e 5
0000022C: conv.i.v
00000230: push.imm.e 35
00000234: conv.i.v
00000238: call action_set_alarm(argc=2)
00000240: popz
00000244: push.imm.e 4
00000248: conv.i.v
0000024C: push.imm.e 30
00000250: conv.i.v
00000254: call action_set_alarm(argc=2)
0000025C: popz
00000260: push.imm.e 50
00000264: pop.v.i life
0000026C: push.imm.e 0
00000270: pop.v.i upo
00000278: push.v y
00000280: neg.v.d
00000284: pop.v.v depth
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: call action_set_relative(argc=1)
0000029C: popz