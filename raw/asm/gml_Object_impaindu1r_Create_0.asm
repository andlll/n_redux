// gml_Object_impaindu1r_Create_0  locals=2 args=0 len=732
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x21BA154
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x21BA154
00000054: b 0x21BA15C
00000058: popenv 0x41BA118
0000005C: b 0x21BA160
00000060: popenv 0x1DBA15C
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x21BA190
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x21BA1D4
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x21BA1D4
000000D4: b 0x21BA1DC
000000D8: popenv 0x41BA198
000000DC: b 0x21BA1E0
000000E0: popenv 0x1DBA1DC
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x21BA210
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.v y
0000011C: neg.v.d
00000120: push.imm.e 1
00000124: add.i.v
00000128: pop.v.v depth
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 30
0000013C: conv.i.v
00000140: call action_set_alarm(argc=2)
00000148: popz
0000014C: push.imm.e 10
00000150: conv.i.v
00000154: push.imm.e 20
00000158: conv.i.v
0000015C: call action_set_alarm(argc=2)
00000164: popz
00000168: push.imm.e 1
0000016C: conv.i.v
00000170: call action_set_relative(argc=1)
00000178: popz
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 569
00000190: conv.i.v
00000194: call action_create_object(argc=3)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.imm.e 2
000001B8: conv.i.v
000001BC: call action_if_dice(argc=1)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x21BA350
000001DC: push.imm.e 2
000001E0: conv.i.v
000001E4: call action_if_dice(argc=1)
000001EC: pop.v.v local.__b__
000001F4: push.local.v local.__b__
000001FC: conv.v.b
00000200: bf 0x21BA328
00000204: push.imm.e 1
00000208: conv.i.v
0000020C: push.imm.e 0
00000210: conv.i.v
00000214: push.imm.e 289
00000218: conv.i.v
0000021C: call action_sprite_set(argc=3)
00000224: popz
00000228: b 0x21BA34C
0000022C: push.imm.e 1
00000230: conv.i.v
00000234: push.imm.e 0
00000238: conv.i.v
0000023C: push.imm.e 290
00000240: conv.i.v
00000244: call action_sprite_set(argc=3)
0000024C: popz
00000250: b 0x21BA3C4
00000254: push.imm.e 2
00000258: conv.i.v
0000025C: call action_if_dice(argc=1)
00000264: pop.v.v local.__b__
0000026C: push.local.v local.__b__
00000274: conv.v.b
00000278: bf 0x21BA3A0
0000027C: push.imm.e 1
00000280: conv.i.v
00000284: push.imm.e 0
00000288: conv.i.v
0000028C: push.imm.e 291
00000290: conv.i.v
00000294: call action_sprite_set(argc=3)
0000029C: popz
000002A0: b 0x21BA3C4
000002A4: push.imm.e 1
000002A8: conv.i.v
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.imm.e 292
000002B8: conv.i.v
000002BC: call action_sprite_set(argc=3)
000002C4: popz
000002C8: push.imm.e 0
000002CC: conv.i.v
000002D0: call action_set_relative(argc=1)
000002D8: popz